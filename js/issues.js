let allIssues = [];

const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner");

// Initial Load
async function loadIssues() {
    spinner.classList.remove("hidden");

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;

    displayIssues(allIssues);
    spinner.classList.add("hidden");
}

// UI Display Logic
function displayIssues(issues) {
    container.innerHTML = "";

    document.getElementById("issueCount").innerText = issues.length + " Issues";

    issues.forEach(issue => {
        const borderColor = issue.status === "open" ? "border-green-500" : "border-purple-500";

        const statusIcon = issue.status === "open" 
            ? "assets/Open-Status.png" 
            : "assets/Closed- Status .png";

        // PRIORITY COLOR
        let priorityColor = "bg-gray-200 text-gray-600";
        const priority = issue.priority.toLowerCase();

        if (priority === "high") {
            priorityColor = "bg-red-100 text-red-600";
        } else if (priority === "medium") {
            priorityColor = "bg-yellow-100 text-yellow-700";
        } else if (priority === "low") {
            priorityColor = "bg-gray-200 text-gray-600";
        }

        // LABEL COLOR SYSTEM
        const labelColors = {
            "BUG": "bg-red-100 text-red-600 border-red-300",
            "HELP WANTED": "bg-yellow-100 text-yellow-700 border-yellow-300",
            "ENHANCEMENT": "bg-green-100 text-green-700 border-green-300",
            "DOCUMENTATION": "bg-blue-100 text-blue-700 border-blue-300"
        };

        let labelsHTML = "";
        issue.labels.forEach(label => {
            const labelKey = label.toUpperCase();
            const color = labelColors[labelKey] || "bg-gray-100 text-gray-600 border-gray-300";
            labelsHTML += `
                <span class="text-xs px-1 py-1 rounded-full border ${color}">
                    ${label.toUpperCase()}
                </span>
            `;
        });

        // CARD TEMPLATE
        const card = `
            <div onclick="openModal(${issue.id})"
                class="bg-white rounded-xl shadow-sm border-t-4 ${borderColor} overflow-hidden cursor-pointer hover:shadow-md transition">
                <div class="p-5">
                    <div class="flex items-center justify-between mb-3">
                        <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <img src="${statusIcon}" class="w-4">
                        </div>
                        <span class="text-xs px-3 py-1 rounded-full ${priorityColor}">
                            ${issue.priority.toUpperCase()}
                        </span>
                    </div>
                    <h3 class="text-[15px] font-semibold text-gray-800 mb-2">${issue.title}</h3>
                    <p class="text-sm text-gray-500 mb-4">${issue.description.substring(0, 80)}...</p>
                    <div class="flex gap-2 flex-wrap mb-3">${labelsHTML}</div>
                </div>
                <div class="border-t px-5 py-3 text-xs text-gray-500">
                    <p>#${issue.id} by ${issue.author}</p>
                    <p class="mt-1">${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Tab Filtering
function showAll() {
    setActive("tabAll");
    displayIssues(allIssues);
}

function showOpen() {
    setActive("tabOpen");
    displayIssues(allIssues.filter(i => i.status === "open"));
}

function showClosed() {
    setActive("tabClosed");
    displayIssues(allIssues.filter(i => i.status === "closed"));
}

function setActive(tabId) {
    document.querySelectorAll("#tabAll,#tabOpen,#tabClosed").forEach(btn => {
        btn.classList.remove("bg-indigo-700", "text-white");
        btn.classList.add("bg-gray-100");
    });

    const active = document.getElementById(tabId);
    active.classList.remove("bg-gray-100");
    active.classList.add("bg-indigo-700", "text-white");
}

// Search
async function searchIssues() {
    const text = document.getElementById("searchInput").value;
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
    const data = await res.json();
    displayIssues(data.data);
}

// Modal Management
async function openModal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;

    document.getElementById("modalTitle").innerText = issue.title;
    document.getElementById("modalDescription").innerText = issue.description;
    document.getElementById("modalAuthor").innerText = "Author: " + issue.author;
    document.getElementById("modalPriority").innerText = issue.priority;
    document.getElementById("modalStatus").innerText = issue.status;

    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal").classList.add("flex");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

loadIssues();