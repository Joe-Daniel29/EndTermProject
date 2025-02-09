

import { machinesArea } from "./DOMElements";

const map = [
  {
    name: "5th floor",
    rightMachines: ["open", "close", "open"],
    leftMachines: ["close", "close"],
  },
  {
    name: "Ground floor",
    rightMachines: ["open", "close"],
    leftMachines: ["close", "open"],
  },
];


const getOpenWashingMachine = () => {
	const container = document.createElement("div");
	container.classList.add(
	  "flex",
	  "flex-col",
	  "items-center",
	  "justify-center",
	  "bg-opacity-5",
	  "bg-white",
	  "rounded-xl",
	  "p-6",
	  "border",
	  "border-opacity-10",
	  "border-white",
	  "hover:bg-opacity-10",
	  "hover:shadow-lg",
	  "hover:-translate-y-1",
	  "transition-all",
	  "duration-300",
	  "relative",
	  "overflow-hidden"
	);
  
	const image = document.createElement("img");
	image.src = "assets/washingmachine/open.svg";
	image.setAttribute("draggable", "false");
	image.classList.add(
	  "w-20",
	  "h-20",
	  "select-none",
	  "transition-transform",
	  "duration-300",
	  "hover:scale-110",
	  "filter",
	  "drop-shadow"
	);
  
	const desc = document.createElement("h3");
	desc.innerText = "OPEN";
	desc.classList.add(
	  "text-center",
	  "font-bold",
	  "text-green-600",
	  "text-shadow",
	  "mt-2"
	);
  
	container.appendChild(image);
	container.appendChild(desc);
  
	// Shine effect
	const shine = document.createElement("div");
	shine.classList.add(
	  "absolute",
	  "inset-0",
	  "bg-gradient-to-r",
	  "from-transparent",
	  "via-white",
	  "to-transparent",
	  "opacity-0",
	  "hover:opacity-10",
	  "transition-opacity",
	  "duration-500"
	);
	container.appendChild(shine);
  
	return container;
  };
  
  const getClosedWashingMachine = () => {
	const container = document.createElement("div");
	container.classList.add(
	  "flex",
	  "flex-col",
	  "items-center",
	  "justify-center",
	  "bg-opacity-5",
	  "bg-white",
	  "rounded-xl",
	  "p-6",
	  "border",
	  "border-opacity-10",
	  "border-white",
	  "hover:bg-opacity-10",
	  "hover:shadow-lg",
	  "hover:-translate-y-1",
	  "transition-all",
	  "duration-300",
	  "relative",
	  "overflow-hidden"
	);
  
	const image = document.createElement("img");
	image.src = "assets/washingmachine/close.svg";
	image.setAttribute("draggable", "false");
	image.classList.add(
	  "w-20",
	  "h-20",
	  "select-none",
	  "transition-transform",
	  "duration-300",
	  "hover:scale-110",
	  "filter",
	  "drop-shadow"
	);
  
	const desc = document.createElement("h3");
	desc.innerText = "AT WORK";
	desc.classList.add(
	  "text-center",
	  "font-bold",
	  "text-red-500",
	  "text-shadow",
	  "mt-2"
	);
  
	container.appendChild(image);
	container.appendChild(desc);
  
	// Shine effect
	const shine = document.createElement("div");
	shine.classList.add(
	  "absolute",
	  "inset-0",
	  "bg-gradient-to-r",
	  "from-transparent",
	  "via-white",
	  "to-transparent",
	  "opacity-0",
	  "hover:opacity-10",
	  "transition-opacity",
	  "duration-500"
	);
	container.appendChild(shine);
  
	return container;
  };
  
  const WashingMachinesRenderer = () => {
	for (let i = 0; i < map.length; i++) {
	  const area = map[i];
	  const machineContainerCode = `
  <div id="machine-container-${i}" class="bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-xl p-4 border border-white/10 hover:shadow-lg transition-all duration-300">
	<div class="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3 cursor-pointer hover:bg-white/15 transition-all duration-300">
	  <h1 class="font-orbitron text-xl text-white text-shadow grow">${area.name}</h1>
	  <i class="fa-solid fa-caret-down machines-toggle-btn text-white/80 hover:text-white transition-all duration-300"></i>
	</div>
	<div class="machines-view flex flex-row gap-12 mt-4 p-4" data-visible="true">
	  <div id="machines-left" class="flex flex-col gap-4"></div>
	  <div id="machines-right" class="flex flex-col gap-4"></div>
	</div>
  </div>
  `;
	  machinesArea.innerHTML += machineContainerCode;
	  const currentMachine = document.querySelector(`#machine-container-${i}`);
	  const leftMachines = currentMachine.querySelector("#machines-left");
	  const rightMachines = currentMachine.querySelector("#machines-right");
  
	  for (let i = 0; i < area.leftMachines.length; i++) {
		const machineState = area.leftMachines[i];
		const machine =
		  machineState === "open"
			? getOpenWashingMachine()
			: getClosedWashingMachine();
		leftMachines.appendChild(machine);
	  }
  
	  for (let i = 0; i < area.rightMachines.length; i++) {
		const machineState = area.rightMachines[i];
		const machine =
		  machineState === "open"
			? getOpenWashingMachine()
			: getClosedWashingMachine();
		rightMachines.appendChild(machine);
	  }
	}
  
	const allMachineToggleBtns = document.querySelectorAll(".machines-toggle-btn");
	for (const btn of allMachineToggleBtns) {
	  btn.addEventListener("click", () => {
		const machine = btn.parentElement.parentElement;
		const machinesView = machine.querySelector(".machines-view");
  
		if (machinesView.dataset.visible === "true") {
		  hideMachines(machinesView);
		  btn.classList.remove("fa-caret-down");
		  btn.classList.add("fa-caret-up");
		} else {
		  showMachines(machinesView);
		  btn.classList.remove("fa-caret-up");
		  btn.classList.add("fa-caret-down");
		}
	  });
	}
  };
  
  const showMachines = (machine) => {
	machine.classList.remove("hidden");
	machine.classList.add("flex");
	machine.dataset.visible = "true";
  };
  
  const hideMachines = (machine) => {
	machine.classList.add("hidden");
	machine.classList.remove("flex");
	machine.dataset.visible = "false";
  };
  
  export default WashingMachinesRenderer;