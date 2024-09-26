## PHP Larevel 10 + SendGrid send email

### SDK
<https://github.com/sendgrid/sendgrid-php>


### install sendgrid
```
composer require sendgrid/sendgrid
```

### 修改你的.env
```
SENDGRID_APIKEY=你的key
```
### sendGrid 後台建立 template

![image](/images/sendgrid-create.jpg "sendGrid > create")

### 載入
```
use SendGrid\Mail\Mail;
use SendGrid\Mail\From;
use SendGrid\Mail\To;
```
### 來源名稱設定
```
$from     = '你的來源mail';
$fromName = '你的來源名稱';

$from = new From($from, $fromName);
```
### 收件人人員 email與收件人名稱，如有帶入參數，可透過第三個值帶入陣列
```
new To(
    'test@test.com',
    '收件人名稱',
    [
        'test' => '123',
    ]
)

```

### 跳整你的 Template ID 與主旨
![image](/images/sendgrid-get-template-id.jpg "sendGrid > get template id")
```
$email->setTemplateId('sendgrid 上面 Template id');
$email->setSubject('主旨');
```

### 確認寄送是否成功狀態
```
$response->statusCode() == 202
```
### 寄送後回傳狀態
```
$response->headers()
```
### 完整 code
```
$from     = '你的來源mail';
$fromName = '你的來源名稱';

$from = new From($from, $fromName);

$tos = [
    new To(
        'test@test.com',
        '收件人名稱',
        [
            'test' => '123',
        ]
    )
];
$email = new Mail(
    $from,
    $tos
);

$email->setTemplateId('sendgrid 上面 Template id');
$email->setSubject('主旨');

$sendgrid = new \SendGrid(getenv('SENDGRID_APIKEY'));
try 
{
    $response = $sendgrid->send($email);
    if ($response->statusCode() == 202)
    {
        
    }
    $statusLog = [
        'headers' => $response->headers(),
        'body'    => $response->body()
    ];
    print_r($statusLog);
}
catch (\Exception $e)
{
    dd($e->getMessage());
}
```