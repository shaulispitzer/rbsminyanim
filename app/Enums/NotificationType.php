<?php

namespace App\Enums;

/** @typescript */
enum NotificationType: string
{
    case SUCCESS = 'success';
    case ERROR = 'error';
    case WARNING = 'warning';
    case INFO = 'info';
    case DEFAULT = 'default';
}
