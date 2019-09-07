set timeout 30
spawn flask fab create-admin
expect "Username"
send "admin\r"
expect "User first name"
send "admin\r"
expect "User last name"
send "admin\r"
expect "Email"
send "shenxing@wavewisdom-bj.com\r"
expect "Password"
send "admin\n"
expect "Repeat for confirmation"
send "admin\n"
interact