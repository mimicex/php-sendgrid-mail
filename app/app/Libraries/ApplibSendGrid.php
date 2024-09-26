<?php namespace App\Libraries;
use SendGrid\Mail\Mail;
use SendGrid\Mail\From;
use SendGrid\Mail\To;

class ApplibSendGrid
{
    public function test()
    {
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
    }
}