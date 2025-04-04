<?php

namespace App\Enums;

enum ProfileType: string
{
    case SUBSCRIBER = 'App\\Models\\SubscriberProfile';

    case TEAMMEMBER = 'App\\Models\\TeamMemberProfile';
}
