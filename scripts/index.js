let selectedTab = "all"
const activeTabs = ["btn-active"]
const removeStyle = ["btn-outline"]

const allSect = document.getElementById("all-sect")
const interviewSect = document.getElementById("interview-sect")
const rejectedSect = document.getElementById("rejected-sect")
const emptyState = document.getElementById("empty-state")



function switchTab(Paramtab) {
    const tabs = ['all', 'interview', 'rejected']

    selectedTab = Paramtab

    for (const tab of tabs) {
        const tabName = document.getElementById("tab-" + tab)

        if (tab === Paramtab) {
            tabName.classList.remove(...removeStyle)
            tabName.classList.add(...activeTabs)
        }

        else {
            tabName.classList.remove(...activeTabs)
            tabName.classList.add(...removeStyle)
        }
    }
    const sections = [allSect, interviewSect, rejectedSect]
    for (const section of sections) {
        section.classList.add("hidden")
    }

    emptyState.classList.add("hidden")

    if (Paramtab === "all") {
        allSect.classList.remove("hidden")
        if (allSect.children.length < 1) {
            emptyState.classList.remove("hidden")
        }
    }

    else if (Paramtab === "interview") {
        interviewSect.classList.remove("hidden")
        if (interviewSect.children.length < 1) {
            emptyState.classList.remove("hidden")
        }
    }

    else {
        rejectedSect.classList.remove("hidden")
        if (rejectedSect.children.length < 1) {
            emptyState.classList.remove("hidden")
        }
    }
    updateStats()
}
// stat update 

const allJobCount = document.getElementById("all-job-count")
const interviewJobCount = document.getElementById("interview-job-count")
const rejectedJobCount = document.getElementById("rejected-job-count")
const availableJobsCount = document.getElementById("available-jobs")

switchTab(selectedTab)

document.getElementById("job-container").addEventListener("click", function (event) {


    const clickedElement = event.target
    const card = clickedElement.closest(".job-card")
    const status = document.querySelector(".status")
    const parent = card.parentNode


    if (clickedElement.classList.contains("interview")) {
        interviewSect.appendChild(card)
        status.innerText = "INTERVIEWD"
        status.classList.remove("btn-error")
        status.classList.add("btn-primary")
    }

    else if (clickedElement.classList.contains("rejected")) {
        rejectedSect.appendChild(card)
        status.innerText = "REJECTED"
        status.classList.remove("btn-primary")
        status.classList.add("btn-error")
    }

    else if (clickedElement.classList.contains("delete")) {
        parent.removeChild(card)
    }
    updateStats()
})


function updateStats() {

    const counts = {
        all: allSect.children.length,
        interview: interviewSect.children.length,
        rejected: rejectedSect.children.length
    }
    allJobCount.innerText = counts['all']
    interviewJobCount.innerText = counts['interview']
    rejectedJobCount.innerText = counts['rejected']
    availableJobsCount.innerText = counts[selectedTab]
    if (counts[selectedTab] < 1) {
        emptyState.classList.remove("hidden")
    }
    else {
        emptyState.classList.add("hidden")
    }
}
updateStats()