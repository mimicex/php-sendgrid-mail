<?php

namespace App\Http\Controllers;
use App\Libraries\ApplibSendGrid;

abstract class Controller
{
    public function index()
    {
        $applibSendGrid = new ApplibSendGrid();
    }
}
