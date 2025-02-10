from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# In-memory storage for machine states (e.g., {0: "open", 1: "close", ...})
machine_states = {}

# Model for incoming state update
class MachineState(BaseModel):
    machine_index: int
    state: str

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

# HTTP endpoint to update machine state
@app.post("/update_state")
async def update_state(data: MachineState):
    machine_states[data.machine_index] = data.state
    # Broadcast the update to all connected WebSocket clients
    await manager.broadcast({
        "machine_index": data.machine_index,
        "state": data.state
    })
    return {"message": "State updated", "machine_index": data.machine_index, "state": data.state}

# WebSocket endpoint for real-time updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # If needed, you can process incoming messages from the client
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
