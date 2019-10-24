<?php
if(isset($_POST["submit"])){
// Checking For Blank Fields..
if($_POST["name"]==""||$_POST["email"]==""||$_POST["query"]==""||$_POST["phone"]==""){
echo "Fill All Fields..";
}else{
// Check if the "Sender's Email" input field is filled out
$email=$_POST['email'];
// Sanitize E-mail Address
$email =filter_var($email, FILTER_SANITIZE_EMAIL);
// Validate E-mail Address
$email= filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$email){
echo "Invalid Sender's Email";
}
else{
$query = $_POST['query'];
$message ='Name:'.$_POST['name'].'\n Phone:'.$_POST['phone']. $_POST['msg'];
$headers = 'From:'. $email . "rn"; // Sender's Email
$headers .= 'Cc:'. $email . "rn"; // Carbon copy to Sender
// Message lines should not exceed 70 characters (PHP rule), so wrap it
$message = wordwrap($message, 370);
// Send Mail By PHP Mail Function
mail("vinodbeloshe12@gmail.com", 'New Enquiry - MSDC', $message, $headers);
// echo "<script>alert('Thank You for Contatcting Us, W'll get back to you shortly')</script>";
// echo "<script>location.href='index.html'</script>";
header("Location: index.html"); 
}
}
}
?>