const API_URL = 'YOUR_DEPLOYED_GAS_URL'; // เปลี่ยนตรงนี้เป็น URL Web App ของ Apps Script

async function loadTable() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row["ประทับตรา"]}</td>
      <td>${row["เลขบัตร ปชช."]}</td>
      <td>${row["ชื่อ"]}</td>
      <td>${row["หน่วยเจ้าของเรื่อง"]}</td>
      <td>${row["สถานะ"]}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick='editRecord(${JSON.stringify(row)})'>✏️</button>
        <button class="btn btn-sm btn-danger" onclick='deleteRecord("${row["ประทับตรา"]}")'>🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  $('#dataTable').DataTable();
}

async function deleteRecord(id) {
  if (confirm("ยืนยันลบข้อมูลใช่ไหม?")) {
    await fetch(API_URL, {
      method: "DELETE",
      body: JSON.stringify({ "ประทับตรา": id }),
    });
    alert("ลบข้อมูลแล้ว");
    location.reload();
  }
}

function editRecord(data) {
  alert("ยังไม่ได้ใส่ฟอร์มแก้ไข: " + JSON.stringify(data));
}

loadTable();
