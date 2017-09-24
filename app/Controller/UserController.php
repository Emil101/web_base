<?php
namespace App\Controller;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Aura\Session\SessionFactory;
use playcms\playcms\User;
use playcms\playcms\UserQuery;

class UserController extends Controller
{
   

    public function index($request, $response, $args)
    {
        $req_user   = $request->getAttribute('user');
        $user       = $req_user['UserDetails'];
        $data["Session"]  = $user;
        $this->logger->debug($response);
        return (is_null ($user)) ? $this->view->render($response, "./admin/login.twig") :  $response->withRedirect( $this->router->pathFor('Dashboard'), 401 );
    }

    public function login($request, $response, $args)
    {
        $form['username']   = filter_var($request->getParam('password'), FILTER_SANITIZE_STRING);
        $form['password']   = filter_var($request->getParam('password'), FILTER_SANITIZE_STRING);
        $user     = new UserQuery();
        $login    = $user->login($form);
        $output   = [];

        if (is_null($login)) {
            $output['status']   =   'error';
            $output['data']     =   '<p class="alert alert-danger text-center"> <i class="fa fa-ban fa-fw"> </i> Invalid  Username and password </p>';
        } else {
            $session    = new SessionFactory();
            $session    = $session->newInstance($_COOKIE);
            $UserDetails  = $session->getSegment('UserDetails');
            $login      = $login->toArray();
            foreach ($login as $field => $value) {
              # code...
                ($field!='Password') ? $UserDetails->set($field, $value) : "";
            }
            $output['status']   =   'success';
            $output['data']     =   '<p class="alert alert-success text-center"> <i class="fa fa-check fa-fw"> </i> Login Successful </p>';
        }
        echo json_encode($output);
    }
    
    public function loginPage($request, $response, $args)
    {
        $session    = new SessionFactory();
        $session    = $session->newInstance($_COOKIE);
        $UserDetails= $session->getSegment('UserDetails');
        $user       = $UserDetails->get('Username');
        return (is_null ($user)) ? $this->view->render($response, "./admin/login.twig") :   $response->withRedirect( $this->router->pathFor('index'), 200 );
    }

    public function logout($request, $response, $args)
    {
          $session    = new SessionFactory();
          $session    = $session->newInstance($_COOKIE);
          $session->regenerateId();
          $session->clear();
          $session->destroy();
          return $response->withRedirect( $this->router->pathFor('LoginForm'), 401 );
    }

    /* Application Middleware
    *
    */
    public function validateUserLogin($request, $response, $next)
    {
        $session    = new SessionFactory();
        $session    = $session->newInstance($_COOKIE);
        $UserDetails= $session->getSegment('UserDetails');
        $user       = $UserDetails->get('Username');
        $request    = $request->withAttribute('user', $_SESSION);
        return (is_null ($user)) ? $response->withRedirect( $this->router->pathFor('LoginForm'), 401 ) :  $next($request, $response)->withStatus(200);
    }
}
