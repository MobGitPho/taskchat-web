<?php

namespace App\Models;

use App\Enums\ProfileType;
use Illuminate\Database\Eloquent\Builder;
use Creopse\Creopse\Models\User as CreopseUser;

class User extends CreopseUser
{
    /**
     * Subscriber Profile accessor
     *
     * @return bool
     */
    public function getHasSubscriberProfileAttribute()
    {
        return $this->profile_type == ProfileType::SUBSCRIBER->value;
    }

    /**
     * Subscriber Profile scope
     *
     * @return Builder
     */
    public function scopeWhereHasSubscriberProfile(Builder $builder)
    {
        return $builder->where('profile_type', ProfileType::SUBSCRIBER->value);
    }
}
