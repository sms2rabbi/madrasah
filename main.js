const apiBase = "https://bdapi.vercel.app/api/v.1";

    async function fetchAndPopulate(endpoint, selectEl, placeholder) {
      try {
        const resp = await fetch(`${apiBase}/${endpoint}`);
        const data = await resp.json();

        selectEl.innerHTML = `<option value="">-- ${placeholder} --</option>`;

        data.data.forEach((item) => {
          const opt = document.createElement("option");

          opt.value = item._id || item.id || item.name;
          opt.textContent = item.bn_name || item.name;

          selectEl.appendChild(opt);
        });

        selectEl.disabled = false;
      } catch (error) {
        console.error("API fetch error:", error);
        alert("ডাটা লোড করতে সমস্যা হয়েছে!");
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      const divEl = document.getElementById("division");
      const distEl = document.getElementById("district");
      const upaEl = document.getElementById("upazila");
      const uniEl = document.getElementById("union");

      fetchAndPopulate("division", divEl, "বিভাগ নির্বাচন করুন");

      divEl.addEventListener("change", async function () {
        distEl.disabled = true;
        upaEl.disabled = true;
        uniEl.disabled = true;

        distEl.innerHTML = `<option value="">-- জেলা নির্বাচন করুন --</option>`;
        upaEl.innerHTML = `<option value="">-- উপজেলা নির্বাচন করুন --</option>`;
        uniEl.innerHTML = `<option value="">-- ইউনিয়ন নির্বাচন করুন --</option>`;

        const divisionId = this.value;
        if (divisionId) {
          await fetchAndPopulate(`district/${divisionId}`, distEl, "জেলা নির্বাচন করুন");
        }
      });

      distEl.addEventListener("change", async function () {
        upaEl.disabled = true;
        uniEl.disabled = true;

        upaEl.innerHTML = `<option value="">-- উপজেলা নির্বাচন করুন --</option>`;
        uniEl.innerHTML = `<option value="">-- ইউনিয়ন নির্বাচন করুন --</option>`;

        const districtId = this.value;
        if (districtId) {
          await fetchAndPopulate(`upazilla/${districtId}`, upaEl, "উপজেলা নির্বাচন করুন");
        }
      });

      upaEl.addEventListener("change", async function () {
        uniEl.disabled = true;
        uniEl.innerHTML = `<option value="">-- ইউনিয়ন নির্বাচন করুন --</option>`;

        const upazilaId = this.value;
        if (upazilaId) {
          await fetchAndPopulate(`union/${upazilaId}`, uniEl, "ইউনিয়ন নির্বাচন করুন");
        }
      });
    });



//⛔⛔⛔
const subjects = [
  "ফিকহ", "তাফসীর", "হাদীস", "নাহু", "সারফ", "তাজভীদ", "উর্দু", "আকাইদ", "মানতিক", "বালাগাত", "আদব", "ইংরেজি", "গণিত"
];

const sampleResults = {
  mutawassitah1: [
    {
      name: "আব্দুল্লাহ", roll: 1, marks: [90, 88, 85, 92, 89, 87, 84, 86, 83, 82, 88, 80, 85]
    },
    {
      name: "রহমান", roll: 2, marks: [75, 70, 72, 74, 76, 78, 77, 73, 71, 70, 72, 69, 74]
    }
  ],
  mutawassitah2: [
    {
      name: "মুআজ", roll: 1, marks: [82, 85, 80, 79, 83, 81, 77, 80, 78, 76, 82, 79, 81]
    },
    {
      name: "মাকসুদ", roll: 2, marks: [68, 65, 66, 70, 72, 67, 64, 66, 63, 61, 65, 60, 62]
    }
  ],
  kafiya: [
    {
      name: "হাসান", roll: 1, marks: [92, 95, 94, 93, 90, 96, 91, 94, 93, 92, 90, 89, 95]
    },
    {
      name: "নাসির", roll: 2, marks: [70, 72, 74, 69, 71, 73, 75, 68, 67, 66, 70, 65, 72]
    }
  ],
  mishkat: [
    {
      name: "সাইফুল", roll: 1, marks: [85, 87, 88, 86, 84, 89, 83, 82, 81, 80, 85, 84, 86]
    },
    {
      name: "আজিম", roll: 2, marks: [78, 76, 75, 77, 74, 73, 72, 70, 71, 69, 74, 68, 70]
    }
  ]
};

function getGrade(avg) {
  if (avg >= 90) return "মুমতায";
  if (avg >= 80) return "জাইয়িদ জিদ্দান";
  if (avg >= 70) return "জাইয়িদ";
  if (avg >= 60) return "মাকবূল";
  return "রদ্দ";
}

const classSelect = document.getElementById("classSelect");
const resultContainer = document.getElementById("resultTableContainer");

classSelect.addEventListener("change", () => {
  const selected = classSelect.value;
  const resultData = sampleResults[selected];

  if (!resultData) {
    resultContainer.innerHTML = '<p style="color:red;">এই শ্রেণীর জন্য এখনো কোনো রেজাল্ট পাওয়া যায়নি।</p>';
    return;
  }

  let fullHTML = "";

  resultData.forEach((student) => {
    const total = student.marks.reduce((a, b) => a + b, 0);
    const avg = (total / student.marks.length).toFixed(2);
    const grade = getGrade(avg);

   let tableHTML = `
  <table border="1" cellspacing="0" cellpadding="6" style="width:320px; margin-bottom:20px; border-collapse:collapse; text-align:center; position: relative;">
    <thead style="background:#d0f0fd; position: relative;">
      <tr>
        <th colspan="2" style="padding:10px; text-align:left; position: relative;">
          <span style="float: left;">নাম: ${student.name}</span>
          <span style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
            রোল: ${student.roll}
          </span>
        </th>
      </tr>
    </thead>

    <thead style="background:#e0e0e0;">
      <tr><th>বিষয়</th><th>প্রাপ্ত নম্বর</th></tr>
    </thead>
    <tbody>
      ${subjects.map((sub, i) => {
        const mark = student.marks[i];
        const markStyle = mark < 33 ? 'color:red; font-weight:bold;' : '';
        return `<tr>
                  <td>${sub}</td>
                  <td style="${markStyle}">${mark}</td>
                </tr>`;
      }).join('')}
      <tr style="font-weight:bold; background:#f9f9f9;">
        <td>গড়</td>
        <td>${avg}</td>
      </tr>
      <tr style="font-weight:bold; background:#f0f0f0;">
        <td>গ্রেড</td>
        <td style="${grade === 'মাকবূল' ? 'color:red;' : ''}">${grade}</td>
      </tr>
    </tbody>
  </table>
`;
fullHTML += tableHTML;
  });

  resultContainer.innerHTML = fullHTML;
});



//⛔⛔⛔⛔
window.addEventListener('DOMContentLoaded', () => {
  const bnNums = n => n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

  const engDate = () => {
    const now = new Date();
    const opts = { day: 'numeric', month: 'long', year: 'numeric' };
    const en = now.toLocaleDateString('en-GB', opts);
    return bnNums(en);
  };

  const getBanglaDate = () => {
    const banglaMonths = ["বৈশাখ","জ্যৈষ্ঠ","আষাঢ়","শ্রাবণ","ভাদ্র","আশ্বিন","কার্তিক","অগ্রহায়ণ","পৌষ","মাঘ","ফাল্গুন","চৈত্র"];
    const today = new Date();
    const banglaStart = new Date(today.getFullYear(), 3, 14);
    const diffDays = Math.floor((today - banglaStart) / (1000 * 60 * 60 * 24));
    let year = today.getFullYear() - 593;
    if (diffDays < 0) year--;
    let monthIndex = Math.floor(diffDays / 30);
    let day = diffDays % 30 + 1;
    if (monthIndex < 0) monthIndex += 12;
    return `${bnNums(day)} ${banglaMonths[monthIndex]} ${bnNums(year)}`;
  };

  const getHijriDateApprox = () => {
    const today = new Date();
    const hijriYearLength = 354.367 * 24 * 60 * 60 * 1000;
    const hijriStart = new Date(622, 6, 16);
    let diff = today.getTime() - hijriStart.getTime();
    let hijriYear = Math.floor(diff / hijriYearLength) + 1;
    let yearStart = hijriStart.getTime() + (hijriYear - 1) * hijriYearLength;
    let daysIntoYear = Math.floor((today.getTime() - yearStart) / (1000 * 60 * 60 * 24)) + 1;
    const hijriMonths = ["মুহাররম","সফর","রবিউল আউয়াল","রবিউস সানি","জমাদিউল আউয়াল","জমাদিউস সানি","রজব","শাবান","রমজান","শাওয়াল","জিলকদ","জিলহজ"];
    let monthIndex = Math.floor(daysIntoYear / 29.53);
    let day = Math.floor(daysIntoYear % 29.53);
    if(day === 0) day = 29;
    if(monthIndex >= 12) monthIndex = 11;
    return `${bnNums(day)} ${hijriMonths[monthIndex]} ${bnNums(hijriYear)} হিজরি`;
  };

  const updateClock = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('bn-BD', {
      hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
    }).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

    // শুধু মান গুলো যোগ করলাম, লেবেল ছাড়া
    const line = `${getHijriDateApprox()} | ${getBanglaDate()} | ${engDate()} | সময়: ${time}`;
    document.getElementById("full-date-time").innerText = line;
  };

  updateClock();
  setInterval(updateClock, 1000);
});
