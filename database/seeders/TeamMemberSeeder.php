<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TeamMemberProfile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Enums\ProfileType;
use App\Models\User;

use Creopse\Creopse\Enums\AccountStatus;
use Creopse\Creopse\Enums\AuthType;
use Creopse\Creopse\Models\Role;
use Creopse\Creopse\Enums\UserRole;

class TeamMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Récupération de l’ID du rôle 'user'
        $roleAdmin = Role::firstOrCreate(['name' => 'admin']);
        $roleUser = Role::firstOrCreate(['name' => 'user']);

        for ($i = 1; $i <= 5; $i++) {
            // Créer un profil unique pour chaque utilisateur
            $teamMemberProfile = new TeamMemberProfile();
            $teamMemberProfile->save();

            // Création de l'utilisateur
            $user = new User();
            $user->lastname = "User{$i}";
            $user->firstname = "Test";
            $user->email = "user{$i}@test.com";
            $user->email_verified_at = now();
            $user->password = Hash::make('password');
            $user->remember_token = Str::random(60);
            $user->uid = "user{$i}_testUser";
            $user->address = "Adresse Test {$i}";
            $user->account_status = AccountStatus::ENABLED->value;
            $user->auth_type = AuthType::EMAIL_PASSWORD->value;

            // Lier au profil
            $user->profile_id = $teamMemberProfile->id;
            $user->profile_type = ProfileType::TEAMMEMBER->value;

            $user->save();

            // 🎲 Assigner un rôle aléatoire à l'utilisateur
            $randomRole = rand(0, 1) ? $roleAdmin : $roleUser;

            // Assigner le rôle à l'utilisateur
            $user->attachRole($randomRole);

            //$user->attachRole($role); //si $role est une instance du modèle Role
        }
    }
}
