<?php
// admission_submit.php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // ফর্ম ডাটা স্যানিটাইজ
    $full_name   = trim(htmlspecialchars($_POST['full_name'] ?? ''));
    $father_name = trim(htmlspecialchars($_POST['father_name'] ?? ''));
    $mother_name = trim(htmlspecialchars($_POST['mother_name'] ?? ''));
    $dob         = trim(htmlspecialchars($_POST['dob'] ?? ''));
    $mobile      = trim(htmlspecialchars($_POST['mobile'] ?? ''));
    $division    = trim(htmlspecialchars($_POST['division'] ?? ''));
    $district    = trim(htmlspecialchars($_POST['district'] ?? ''));
    $upazila     = trim(htmlspecialchars($_POST['upazila'] ?? ''));
    $union       = trim(htmlspecialchars($_POST['union'] ?? ''));
    $village     = trim(htmlspecialchars($_POST['village'] ?? ''));
    $course      = trim(htmlspecialchars($_POST['course'] ?? ''));

    // ভ্যালিডেশন
    $errors = [];
    if (!$full_name) $errors[] = "পূর্ণ নাম আবশ্যক।";
    if (!$father_name) $errors[] = "পিতার নাম আবশ্যক।";
    if (!$dob) $errors[] = "জন্ম তারিখ আবশ্যক।";
    if (!$mobile) $errors[] = "মোবাইল নম্বর আবশ্যক।";
    if (!$division) $errors[] = "বিভাগ নির্বাচন আবশ্যক।";
    if (!$district) $errors[] = "জেলা নির্বাচন আবশ্যক।";
    if (!$upazila) $errors[] = "উপজেলা নির্বাচন আবশ্যক।";
    if (!$union) $errors[] = "ইউনিয়ন নির্বাচন আবশ্যক।";
    if (!$village) $errors[] = "গ্রামের নাম আবশ্যক।";
    if (!$course) $errors[] = "কোর্স নির্বাচন আবশ্যক।";

    if ($errors) {
        echo "<h3>ভুল হয়েছে:</h3><ul>";
        foreach ($errors as $e) echo "<li>$e</li>";
        echo "</ul><a href='javascript:history.back()'>পেছনে যান</a>";
        exit;
    }

    // CSV ফাইলে ডাটা সংরক্ষণ
    $file = 'applications.csv';
    $newData = [
        date('Y-m-d H:i:s'),
        $full_name,
        $father_name,
        $mother_name,
        $dob,
        $mobile,
        $division,
        $district,
        $upazila,
        $union,
        $village,
        $course
    ];

    $fp = fopen($file, 'a');
    if (filesize($file) === 0) {
        fputcsv($fp, ['তারিখ', 'পূর্ণ নাম', 'পিতার নাম', 'মাতার নাম', 'জন্ম তারিখ', 'মোবাইল', 'বিভাগ', 'জেলা', 'উপজেলা', 'ইউনিয়ন', 'গ্রাম', 'কোর্স']);
    }
    fputcsv($fp, $newData);
    fclose($fp);

    // ইউজারকে সাকসেস মেসেজ দেখানো
    echo "<h2>✅ আবেদন সম্পন্ন হয়েছে!</h2>";
    echo "<p>আমাদের পক্ষ থেকে আপনার সাথে মোবাইল নম্বরের মাধ্যমে যোগাযোগ করা হবে। ধন্যবাদ।</p>";
    echo "<a href='index.html'>হোম পেজে ফিরে যান</a>";
} else {
    header("Location: index.html");
    exit;
}
?>
