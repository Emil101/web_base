<?php
    /**
     *This routes will provide all Admin methods
     *
     *
    */
// Login Routes
$app->get('/admin/login', "App\Controller\UserController:loginPage")->setName('LoginForm');
$app->post('/admin/login', "App\Controller\UserController:login")->setName('Login');

// Group Admin Routes
$adminRoute =   $app->group('/admin', function () {
                    $this->get('', "App\Controller\UserController:index")->setName('index');
                    $this->get('/dashboard', "App\Controller\AnalyticsController:index")->setName('Dashboard');
                    $this->get('/logout', "App\Controller\UserController:logout")->setName('Logout');
                    /* Page Routes */
                    $this->group('/page', function () {
                        $this->get('/homepage', "App\Controller\PageController:editPage")->setName('homepage');
                        $this->get('/about', "App\Controller\PageController:editPage")->setName('about');
                        $this->post('/save', "App\Controller\PageController:save")->setName('savePage');
                    });
                    /* Settings route */
                    $this->group('/settings', function () {
                        $this->get('', "App\Controller\SettingsController:index")->setName('settings');
                        $this->post('/updateDetails', "App\Controller\SettingsController:updateCompanyDetails")->setName('updateDetails');
                        $this->post('/updateSocials', "App\Controller\SettingsController:updateSocialMedia")->setName('updateSocials');
                    });
                    /* Feedback routes */
                    $this->group('/feedback', function () {
                        $this->get('', "App\Controller\FeedbackController:index")->setName('feedback');
                    });
                    /* Widgets Route */
                    $this->group('/w', function () {
                        $this->post('/add',"App\Controller\WidgetController:addWidget")->setName('addWidget');
                        $this->get('/view/[{widget}]', "App\Controller\WidgetController:index")->setName('viewWidget');
                        $this->get('/listing', "App\Controller\AnalyticsController:index")->setName('listing');
                    });
});

// Middleware
$adminRoute->add("App\Controller\UserController:validateUserLogin");
