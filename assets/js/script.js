$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }

    // scroll spy
    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  // smooth scrolling
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });

  // <!-- emailjs to mail contact form data -->
  $("#contact-form").submit(function (event) {
    emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

    emailjs
      .sendForm("contact_service", "template_contact", "#contact-form")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          document.getElementById("contact-form").reset();
          alert("Form Submitted Successfully");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Form Submission Failed! Try Again");
        }
      );
    event.preventDefault();
  });
  // <!-- emailjs to mail contact form data -->
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Rao Azlan";
    $("#favicon").attr("href", "assets/images/favicon.ico");
  } else {
    document.title = "Portfolio | Rao Azlan";
    $("#favicon").attr("href", "assets/images/favicon.ico");
  }
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: ["android development", "web development", "backend development"],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});
// <!-- typed js effect ends -->
async function fetchData(type) {
  let response;
  if (type === "skills") {
    response = await fetch("skills.json");
  } else if (type === "frontend") {
    response = await fetch("frontend.json");
  } else if (type === "backend") {
    response = await fetch("backend.json");
  } else if (type === "database") {
    response = await fetch("database.json");
  }
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("programmingContainer");
  let skillHTML = "";
  skills.forEach((skill) => {
    skillHTML += `
        <div class="bar">
            <div class="info">
                <img src=${skill.icon} style="height:60px; width:60px" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`;
  });
  skillsContainer.innerHTML = skillHTML;
}

function showFrontend(frontendSkills) {
  let frontendContainer = document.getElementById("frontendContainer");
  let frontendHTML = "";
  frontendSkills.forEach((skill) => {
    frontendHTML += `
        <div class="bar">
            <div class="info">
                <img src=${skill.icon}  style="height:60px; width:60px" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`;
  });
  frontendContainer.innerHTML = frontendHTML;
}

function showBackend(backendSkills) {
  let backendContainer = document.getElementById("backendContainer");
  let backendHTML = "";
  backendSkills.forEach((skill) => {
    backendHTML += `
        <div class="bar">
            <div class="info" style="background-color:white; height:60px; width:60ox">
                <img src=${skill.icon} style="height:inherit; width:60px" alt="skill" />
                </div>
                <span style="font-size:1.7rem; margin-left:20px;" >${skill.name}</span>
        </div>`;
  });
  backendContainer.innerHTML = backendHTML;
}

function showDatabase(databaseSkills) {
  let databaseContainer = document.getElementById("databaseContainer");
  let databaseHTML = "";
  databaseSkills.forEach((skill) => {
    databaseHTML += `
        <div class="bar">
            <div class="info">
                <img src=${skill.icon} style="height:60px; width:60px" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`;
  });
  databaseContainer.innerHTML = databaseHTML;
}

fetchData("skills").then((data) => {
  showSkills(data);
});

fetchData("frontend").then((data) => {
  showFrontend(data);
});

fetchData("backend").then((data) => {
  showBackend(data);
});

fetchData("database").then((data) => {
  showDatabase(data);
});
function showNotes(notes) {
  let skillsContainer = document.getElementById("notesContainer");
  let skillHTML = "";
  notes.forEach((skill) => {
    skillHTML += `
        <div class="bar">
              <div class="info">
                <a target="_blank" href=${skill.link}>
                <img src=${skill.icon} alt="skill"/></a>
                <span>${skill.name}</span>
              </div>
            </div>`;
  });
  skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects
    .slice(0, 10)
    .filter((project) => project.category != "android")
    .forEach((project) => {
      projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`;
    });
  projectsContainer.innerHTML = projectHTML;

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });
  // <!-- tilt js effect ends -->

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: true,
  });

  /* SCROLL PROJECTS */
  srtop.reveal(".work .box", { interval: 200 });
}

fetchData().then((data) => {
  showSkills(data);
});

fetchData("projects").then((data) => {
  showProjects(data);
});

fetchData("notes").then((data) => {
  showNotes(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});
// <!-- tilt js effect ends -->

document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: true,
});

/* SCROLL HOME */
srtop.reveal(".home .content h3", { delay: 200 });
srtop.reveal(".home .content p", { delay: 200 });
srtop.reveal(".home .content .btn", { delay: 200 });

srtop.reveal(".home .image", { delay: 400 });
srtop.reveal(".home .linkedin", { interval: 600 });
srtop.reveal(".home .github", { interval: 800 });
srtop.reveal(".home .twitter", { interval: 1000 });
srtop.reveal(".home .telegram", { interval: 600 });
srtop.reveal(".home .instagram", { interval: 600 });
srtop.reveal(".home .dev", { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal(".about .content h3", { delay: 200 });
srtop.reveal(".about .content .tag", { delay: 200 });
srtop.reveal(".about .content p", { delay: 200 });
srtop.reveal(".about .content .box-container", { delay: 200 });
srtop.reveal(".about .content .resumebtn", { delay: 200 });

/* SCROLL SKILLS */
srtop.reveal(".skills .container", { interval: 200 });
srtop.reveal(".skills .container .bar", { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal(".education .box", { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal(".work .box", { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal(".experience .timeline", { delay: 400 });
srtop.reveal(".experience .timeline .container", { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal(".contact .container", { delay: 400 });
srtop.reveal(".contact .container .form-group", { delay: 400 });
