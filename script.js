const jobs = [
  {id:1,title:"Frontend Developer",company:"PixelNorth",location:"Bengaluru",type:"Full-time",salary:"₹6–9 LPA",experience:"1–3 years",mark:"PN",skills:["JavaScript","CSS"]},
  {id:2,title:"Data Analyst Intern",company:"BrightMetrics",location:"Remote",type:"Internship",salary:"₹15k–20k / mo",experience:"Fresher",mark:"BM",skills:["Excel","SQL"]},
  {id:3,title:"UI/UX Designer",company:"Mango Studio",location:"Chennai",type:"Full-time",salary:"₹5–8 LPA",experience:"1–2 years",mark:"MS",skills:["Figma","Design"]},
  {id:4,title:"SQL Developer",company:"CloudHarbor",location:"Hyderabad",type:"Full-time",salary:"₹7–11 LPA",experience:"2–4 years",mark:"CH",skills:["SQL","Database"]},
  {id:5,title:"Junior Web Developer",company:"Craft Labs",location:"Mumbai",type:"Contract",salary:"₹25k–35k / mo",experience:"0–2 years",mark:"CL",skills:["HTML","JavaScript"]},
  {id:6,title:"Marketing Intern",company:"GoodDay",location:"Bengaluru",type:"Internship",salary:"₹12k–18k / mo",experience:"Fresher",mark:"GD",skills:["Content","Social"]},
];

const jobGrid = document.getElementById("jobGrid");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("applyDialog");
const applyForm = document.getElementById("applyForm");
let selectedJob = null;

function renderJobs() {
  const query = searchInput.value.trim().toLowerCase();
  const location = locationFilter.value;
  const type = typeFilter.value;
  const filtered = jobs.filter(job => {
    const searchable = [job.title, job.company, job.location, job.type, job.experience, ...job.skills].join(" ").toLowerCase();
    return searchable.includes(query) && (!location || job.location === location) && (!type || job.type === type);
  });
  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "opportunity" : "opportunities"}`;
  emptyState.hidden = filtered.length !== 0;
  jobGrid.innerHTML = filtered.map(job => `
    <article class="job-card">
      <div class="company-mark">${job.mark}</div>
      <h3>${job.title}</h3>
      <p class="company-name">${job.company}</p>
      <div class="job-meta"><span>⌖ ${job.location}</span><span>${job.type}</span><span>${job.experience}</span></div>
      <div class="job-bottom"><span class="salary">${job.salary}</span><button class="apply-button" data-job-id="${job.id}">Apply now ↗</button></div>
    </article>`).join("");
}

jobGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-job-id]");
  if (!button) return;
  selectedJob = jobs.find(job => job.id === Number(button.dataset.jobId));
  document.getElementById("dialogJobTitle").textContent = selectedJob.title;
  document.getElementById("formMessage").textContent = "";
  applyForm.reset();
  dialog.showModal();
});
document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
applyForm.addEventListener("submit", event => {
  event.preventDefault();
  const application = {
    jobId: selectedJob.id,
    jobTitle: selectedJob.title,
    name: document.getElementById("applicantName").value.trim(),
    email: document.getElementById("applicantEmail").value.trim(),
    appliedAt: new Date().toISOString()
  };
  const applications = JSON.parse(localStorage.getItem("careerConnectApplications") || "[]");
  applications.push(application);
  localStorage.setItem("careerConnectApplications", JSON.stringify(applications));
  document.getElementById("formMessage").textContent = "Application saved in this browser. Thank you!";
  applyForm.reset();
});
[searchInput, locationFilter, typeFilter].forEach(element => element.addEventListener("input", renderJobs));
document.getElementById("clearFilters").addEventListener("click", () => {
  searchInput.value = ""; locationFilter.value = ""; typeFilter.value = ""; renderJobs();
});
renderJobs();
