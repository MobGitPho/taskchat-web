<?php

use Creopse\Creopse\Enums\UserRole;

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => false,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        UserRole::SUPER_ADMIN->value => [
            'page' => 'p-da,p-ab,p-ac,p-no,p-as,p-rm,p-um,p-cm,p-nm,p-ml,p-aml',
            'action' => 'a-du,a-eu,a-au,a-da,a-ea,a-aa,a-dc,a-ec,a-ac',
        ],
        UserRole::ADMIN->value => [
            'page' => 'p-da,p-ab,p-ac,p-no,p-as,p-um,p-nm,p-ml,p-aml',
            'action' => 'a-eu,a-ea,a-aa,a-ec,a-ac',
        ],
        UserRole::USER->value => [
            'page' => 'p-da,p-ab,p-ac,p-no',
        ],
    ],

    'permissions_map' => [
        'p-da' => 'dashboard',
        'p-ab' => 'about',
        'p-ac' => 'account',
        'p-no' => 'notifications',
        'p-as' => 'app-settings',
        'p-rm' => 'roles-management',
        'p-um' => 'users-management',
        'p-cm' => 'content-management',
        'p-nm' => 'news-management',
        'p-ml' => 'media-library',
        'p-aml' => 'add-media-library',

        'a-du' => 'delete-user',
        'a-eu' => 'edit-user',
        'a-au' => 'add-user',

        'a-da' => 'delete-article',
        'a-ea' => 'edit-article',
        'a-aa' => 'add-article',

        'a-dc' => 'delete-category',
        'a-ec' => 'edit-category',
        'a-ac' => 'add-category',
    ],
];
