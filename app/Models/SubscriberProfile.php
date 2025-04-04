<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriberProfile extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->morphOne('Creopse\Creopse\Models\User', 'profile');
    }
}
