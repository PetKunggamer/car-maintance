// ─── SAMPLE DATA ─────────────────────────────────────────────────────────────
const SAMPLE = [
  {date:'2026-01-08',plate:'กข-1234',vtype:'Toyota Hilux Vigo',miles:85420,symptoms:'น้ำมันเครื่องรั่ว เครื่องยนต์มีเสียงดัง',repair:'เปลี่ยนซีลเครื่องยนต์ เปลี่ยนน้ำมันเครื่อง',cat:'เครื่องยนต์',garage:'อู่ช่างสมชาย',parts:2500,labor:1500,total:4000,status:'เสร็จแล้ว',reporter:'สมชาย ใจดี',note:''},
  {date:'2026-01-15',plate:'กข-5678',vtype:'Honda City',miles:42300,symptoms:'ผ้าเบรกสึก เสียงดังตอนเบรก',repair:'เปลี่ยนผ้าเบรกหน้า-หลัง',cat:'เบรก',garage:'ฮอนด้าเซอร์วิส',parts:3200,labor:800,total:4000,status:'เสร็จแล้ว',reporter:'สุดา พงษ์รัตน์',note:''},
  {date:'2026-01-22',plate:'กค-2345',vtype:'Isuzu D-Max',miles:67800,symptoms:'ยางแตก',repair:'เปลี่ยนยาง 2 เส้น',cat:'ยาง',garage:'ร้านยางสมหวัง',parts:5600,labor:400,total:6000,status:'เสร็จแล้ว',reporter:'วิชัย มั่นคง',note:''},
  {date:'2026-02-03',plate:'กด-3456',vtype:'Toyota Fortuner',miles:125000,symptoms:'แอร์ไม่เย็น',repair:'เติมน้ำยาแอร์ ล้างอีวาโปเรเตอร์',cat:'แอร์',garage:'ศูนย์แอร์รถยนต์',parts:1800,labor:1200,total:3000,status:'เสร็จแล้ว',reporter:'นภา สุขใส',note:''},
  {date:'2026-02-10',plate:'กน-4567',vtype:'Ford Ranger',miles:58600,symptoms:'ไฟหน้าดับ',repair:'เปลี่ยนหลอดไฟ เปลี่ยนฟิวส์',cat:'ระบบไฟ',garage:'ช่างวิชัยออโต้',parts:850,labor:500,total:1350,status:'เสร็จแล้ว',reporter:'ประทีป จันทร์แดง',note:''},
  {date:'2026-02-18',plate:'กข-1234',vtype:'Toyota Hilux Vigo',miles:86100,symptoms:'เบรกมีเสียงดัง',repair:'ปรับตั้งเบรก เปลี่ยนจานเบรกหน้า',cat:'เบรก',garage:'อู่ช่างสมชาย',parts:4500,labor:2000,total:6500,status:'เสร็จแล้ว',reporter:'สมชาย ใจดี',note:''},
  {date:'2026-02-25',plate:'กข-1234',vtype:'Toyota Hilux Vigo',miles:86400,symptoms:'ยางแบน',repair:'ปะยาง เปลี่ยนยางอะไหล่',cat:'ยาง',garage:'ร้านยางสมหวัง',parts:350,labor:200,total:550,status:'เสร็จแล้ว',reporter:'สมชาย ใจดี',note:''},
  {date:'2026-03-05',plate:'กบ-5678',vtype:'Mitsubishi Triton',miles:78900,symptoms:'เครื่องยนต์สั่น ตั้งไฟผิด',repair:'ตั้งไฟ เปลี่ยนหัวเทียน',cat:'เครื่องยนต์',garage:'ศูนย์บริการมิตซู',parts:2200,labor:1800,total:4000,status:'เสร็จแล้ว',reporter:'อรรถพล วงษ์ไทย',note:''},
  {date:'2026-03-08',plate:'กน-4567',vtype:'Ford Ranger',miles:59200,symptoms:'น้ำมันเครื่องหมด',repair:'เปลี่ยนถ่ายน้ำมันเครื่อง กรองน้ำมัน',cat:'เครื่องยนต์',garage:'ช่างวิชัยออโต้',parts:1200,labor:600,total:1800,status:'เสร็จแล้ว',reporter:'ประทีป จันทร์แดง',note:'เช็กระยะ 10,000 กม.'},
  {date:'2026-03-12',plate:'กต-6789',vtype:'Nissan Navara',miles:95400,symptoms:'ช่วงล่างมีเสียงดัง',repair:'เปลี่ยนลูกหมากปีกนก',cat:'ช่วงล่าง',garage:'ช่างวิชัยออโต้',parts:3800,labor:2500,total:6300,status:'เสร็จแล้ว',reporter:'สมชาย ใจดี',note:''},
  {date:'2026-03-20',plate:'กข-5678',vtype:'Honda City',miles:43500,symptoms:'เบรกมือไม่ทำงาน',repair:'ปรับสายเบรกมือ',cat:'เบรก',garage:'ฮอนด้าเซอร์วิส',parts:600,labor:400,total:1000,status:'เสร็จแล้ว',reporter:'สุดา พงษ์รัตน์',note:''},
  {date:'2026-03-28',plate:'กค-2345',vtype:'Isuzu D-Max',miles:68900,symptoms:'แอร์ไม่เย็น น้ำยารั่ว',repair:'เปลี่ยนท่อแอร์ เติมน้ำยา',cat:'แอร์',garage:'ศูนย์แอร์รถยนต์',parts:3500,labor:1500,total:5000,status:'เสร็จแล้ว',reporter:'วิชัย มั่นคง',note:''},
  {date:'2026-04-02',plate:'กด-3456',vtype:'Toyota Fortuner',miles:127200,symptoms:'น้ำมันเกียร์รั่ว',repair:'เปลี่ยนซีลเกียร์ เติมน้ำมันเกียร์',cat:'เครื่องยนต์',garage:'โตโยต้าเซอร์วิส',parts:4200,labor:3000,total:7200,status:'เสร็จแล้ว',reporter:'นภา สุขใส',note:''},
  {date:'2026-04-09',plate:'กน-4567',vtype:'Ford Ranger',miles:59800,symptoms:'ยางสึก ต้องเปลี่ยน',repair:'เปลี่ยนยาง 4 เส้น ถ่วงล้อ',cat:'ยาง',garage:'ร้านยางสมหวัง',parts:11200,labor:800,total:12000,status:'เสร็จแล้ว',reporter:'ประทีป จันทร์แดง',note:'ยาง Bridgestone ขนาด 265/65R17'},
  {date:'2026-04-15',plate:'กข-1234',vtype:'Toyota Hilux Vigo',miles:87200,symptoms:'ระบบไฟฟ้าขัดข้อง แบตหมด',repair:'ตรวจซ่อมระบบไฟ เปลี่ยนแบตเตอรี่',cat:'ระบบไฟ',garage:'ช่างวิชัยออโต้',parts:3500,labor:2000,total:5500,status:'เสร็จแล้ว',reporter:'สมชาย ใจดี',note:''},
  {date:'2026-04-22',plate:'กบ-5678',vtype:'Mitsubishi Triton',miles:80100,symptoms:'กันสาดหลุด ตัวถังบุบ',repair:'ซ่อมกันสาด อัดพ่นสีบริเวณที่บุบ',cat:'อื่น ๆ',garage:'อู่ตัวถังเฮียแม้น',parts:2800,labor:1200,total:4000,status:'เสร็จแล้ว',reporter:'อรรถพล วงษ์ไทย',note:''},
  {date:'2026-04-28',plate:'กต-6789',vtype:'Nissan Navara',miles:96200,symptoms:'กระจกไฟฟ้าเสีย',repair:'ซ่อมมอเตอร์กระจกประตูหน้าซ้าย',cat:'อื่น ๆ',garage:'ร้านอิเล็กทรอนิกส์รถยนต์',parts:2500,labor:1500,total:4000,status:'เสร็จแล้ว',reporter:'สมชาย ใจดี',note:''},
  {date:'2026-05-03',plate:'กต-6789',vtype:'Nissan Navara',miles:96800,symptoms:'น้ำหม้อน้ำรั่ว เครื่องร้อน',repair:'เปลี่ยนหม้อน้ำ เปลี่ยนน้ำยาหล่อเย็น',cat:'เครื่องยนต์',garage:'ช่างวิชัยออโต้',parts:6500,labor:2500,total:9000,status:'เสร็จแล้ว',reporter:'สมชาย ใจดี',note:'แนะนำตรวจระบบหล่อเย็นทุก 6 เดือน'},
  {date:'2026-05-10',plate:'กข-5678',vtype:'Honda City',miles:44800,symptoms:'เบรกหน้าร้อนผิดปกติ',repair:'เปลี่ยนผ้าเบรก จานเบรกหน้า',cat:'เบรก',garage:'ฮอนด้าเซอร์วิส',parts:4800,labor:1200,total:6000,status:'เสร็จแล้ว',reporter:'สุดา พงษ์รัตน์',note:''},
  {date:'2026-05-18',plate:'กค-2345',vtype:'Isuzu D-Max',miles:70200,symptoms:'เครื่องยนต์เสียงดัง ควันดำ',repair:'ตรวจเครื่อง เปลี่ยนหัวฉีด ล้างหัวฉีด',cat:'เครื่องยนต์',garage:'ศูนย์บริการอีซูซุ',parts:8500,labor:4500,total:13000,status:'เสร็จแล้ว',reporter:'วิชัย มั่นคง',note:''},
  {date:'2026-05-25',plate:'กด-3456',vtype:'Toyota Fortuner',miles:128500,symptoms:'ยางอ่อน ไฟเตือนแดง',repair:'เปลี่ยนยาง 2 เส้น ปะยาง 1 เส้น',cat:'ยาง',garage:'ร้านยางสมหวัง',parts:4200,labor:600,total:4800,status:'กำลังซ่อม',reporter:'นภา สุขใส',note:'รอยางสั่ง'},
  {date:'2026-06-01',plate:'กน-4567',vtype:'Ford Ranger',miles:61200,symptoms:'เสียงดังใต้ท้องรถ โช้ครั่ว',repair:'ตรวจช่วงล่าง เปลี่ยนโช้คหน้า',cat:'ช่วงล่าง',garage:'ช่างวิชัยออโต้',parts:7200,labor:3500,total:10700,status:'กำลังซ่อม',reporter:'ประทีป จันทร์แดง',note:'รอชิ้นส่วน'},
  {date:'2026-06-03',plate:'กข-1234',vtype:'Toyota Hilux Vigo',miles:88100,symptoms:'แอร์ไม่เย็น น้ำยาหมด',repair:'ตรวจแอร์ เติมน้ำยา ล้างคอยล์เย็น',cat:'แอร์',garage:'ศูนย์แอร์รถยนต์',parts:1200,labor:800,total:2000,status:'กำลังซ่อม',reporter:'สมชาย ใจดี',note:'นัดรับวันศุกร์'},
  {date:'2026-06-05',plate:'กบ-5678',vtype:'Mitsubishi Triton',miles:81400,symptoms:'ไฟท้ายไม่ทำงาน สายไฟชำรุด',repair:'เปลี่ยนหลอดไฟท้าย ซ่อมสายไฟ',cat:'ระบบไฟ',garage:'ช่างวิชัยออโต้',parts:1500,labor:1000,total:2500,status:'กำลังซ่อม',reporter:'อรรถพล วงษ์ไทย',note:''},
  {date:'2026-06-07',plate:'กต-6789',vtype:'Nissan Navara',miles:97500,symptoms:'ยางสึกไม่สม่ำเสมอ',repair:'สลับยาง ถ่วงล้อ ตั้งศูนย์ล้อ',cat:'ยาง',garage:'ร้านยางสมหวัง',parts:500,labor:800,total:1300,status:'รอดำเนินการ',reporter:'สมชาย ใจดี',note:'นัด 10 มิ.ย.'},
  {date:'2026-06-08',plate:'กข-5678',vtype:'Honda City',miles:45600,symptoms:'เกียร์กระตุก เปลี่ยนเกียร์ไม่ลื่น',repair:'ตรวจระบบเกียร์ เปลี่ยนน้ำมันเกียร์',cat:'เครื่องยนต์',garage:'ฮอนด้าเซอร์วิส',parts:0,labor:1500,total:1500,status:'รอดำเนินการ',reporter:'สุดา พงษ์รัตน์',note:''},
  {date:'2026-06-09',plate:'กค-2345',vtype:'Isuzu D-Max',miles:71000,symptoms:'ช่วงล่างมีเสียงแปลก',repair:'ตรวจสอบช่วงล่างทั้งหมด',cat:'ช่วงล่าง',garage:'ช่างวิชัยออโต้',parts:0,labor:0,total:0,status:'รอดำเนินการ',reporter:'วิชัย มั่นคง',note:'รอประเมินราคา'},
  {date:'2026-06-10',plate:'กด-3456',vtype:'Toyota Fortuner',miles:129000,symptoms:'แบตเตอรี่อ่อน สตาร์ทยาก',repair:'เปลี่ยนแบตเตอรี่',cat:'ระบบไฟ',garage:'โตโยต้าเซอร์วิส',parts:3500,labor:500,total:4000,status:'รอดำเนินการ',reporter:'นภา สุขใส',note:''}
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CAT_COLORS = {
  'เครื่องยนต์':'#3b82f6','เบรก':'#ef4444','ยาง':'#10b981','แอร์':'#06b6d4',
  'ระบบไฟ':'#f59e0b','ช่วงล่าง':'#8b5cf6','อื่น ๆ':'#6b7280'
};
const MONTHS_TH = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
const MONTHS_FULL = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

// ─── COLUMN MAP FOR EXCEL IMPORT ─────────────────────────────────────────────
const COL_MAP = {
  'วันที่':'date','date':'date',
  'ทะเบียนรถ':'plate','ทะเบียน':'plate','license':'plate',
  'ประเภทยานพาหนะ':'vcat','vehicle category':'vcat','vcat':'vcat',
  'ประเภทรถ':'vtype','ยี่ห้อ/รุ่น':'vtype','vehicle type':'vtype','type':'vtype',
  'เลขไมล์':'miles','ไมล์':'miles','mileage':'miles','miles':'miles',
  'อาการ/ปัญหา':'symptoms','อาการ':'symptoms','ปัญหา':'symptoms','symptoms':'symptoms',
  'รายการซ่อม':'repair','repair':'repair','repair items':'repair',
  'หมวดหมู่ซ่อม':'cat','หมวดหมู่':'cat','category':'cat',
  'อู่/ผู้ซ่อม':'garage','อู่':'garage','garage':'garage',
  'ค่าอะไหล่':'parts','parts cost':'parts','parts':'parts',
  'ค่าแรง':'labor','labor cost':'labor','labor':'labor',
  'รวมค่าใช้จ่าย':'total','รวม':'total','total cost':'total','total':'total',
  'สถานะ':'status','status':'status',
  'ผู้แจ้ง':'reporter','reporter':'reporter',
  'หมายเหตุ':'note','note':'note','notes':'note','remark':'note'
};
