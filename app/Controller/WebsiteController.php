<?php
namespace App\Controller;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Aura\Session\SessionFactory;

class WebsiteController extends Controller {
  public function index($request, $response, $args) {
    $this->logger->error(implode(',',$args));
    $this->logger->info('info');
    @$page = $args['page'];
    switch ($page) {
      case '':
        # code...
        return $this->view->render($response, "./website/index.twig");
        break;
      case $page:
        # code...
        return $this->view->render($response, "./website/$page.twig");
        break;
      case '*':
        # code...
        return $this->view->render($response, "./website/index.twig");
        break;
      default:
        # code...
        break;
    }
  }
}