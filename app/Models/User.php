<?php

namespace App\Models;

use Creopse\Creopse\Laratrust\Traits\HasRoles;

use App\Enums\ProfileType;
use Illuminate\Database\Eloquent\Builder;
use Creopse\Creopse\Models\User as CreopseUser;
use Creopse\Creopse\Models\Role;

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

    /**
     * Team Member Profile accessor
     *
     * @return bool
     */
    public function getHasTeamMemberProfileAttribute()
    {
        return $this->profile_type == ProfileType::TEAMMEMBER->value;
    }

    /**
     * Team Member Profile scope
     *
     * @return Builder
     */
    public function scopeWhereHasTeamMemberProfile(Builder $builder)
    {
        return $builder->where('profile_type', ProfileType::TEAMMEMBER->value);
    }


}
