<?php
namespace App\Controller;

use Slim\Container;

class Controller{
    
    protected $view;
    protected $logger;
    protected $render;

    public function __construct(Container $container) {
        $this->view = $container->get('view');
        $this->logger = $container->get('logger');
        $this->router = $container->get('router');
    }

    /*$file : Filename with location i.e "../temp/.."
    * $content : Content to save to file
    */
    protected function saveToFile($file,$content){
        return (file_put_contents($file, $content)) ? true : false;
    }

    /* This method return  md5(uniqid(rand(), true)); */
    protected function uniqueId(){
        return md5(uniqid(rand(), true));
    }
    
}
