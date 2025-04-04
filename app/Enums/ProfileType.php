<?php

namespace App\Enums;

enum ProfileType: string
{
    case SUBSCRIBER = 'App\\Models\\SubscriberProfile';

    case TeamMember = 'App\\Models\\TeamMemberProfile';
}
