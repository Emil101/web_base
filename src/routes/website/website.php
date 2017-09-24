<?php
    /** 
     *This routes will provide all website route params 
     *
     *
    */
   $websiteRoute = $app->get('/[{page}]', "App\Controller\WebsiteController:index")->setName('website');

   $websiteRoute->add("App\Controller\AnalyticsController:addAnalytics");
   