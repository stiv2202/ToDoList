<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{

    // private $logger;

    // public function __construct(LoggerInterface $logger)
    // {
    //     $this->logger = $logger;
    // }

    #[Route('/user', name: 'list_user')]
    public function list(Request $request, UserRepository $userRepository)
    {
        //$users = $userRepository->findBy(['name'=> $name]);
        $users = $userRepository->findAll();
        $data = array_map(function ($user) {
            return [
                'id' => $user->getId(),
                'name' => $user->getName() . ' ' . $user->getLastname(),
            ];
        }, $users);
        $response = new JsonResponse();
        $response->setData([
            'success' => true,
            'data' => $data
        ]);
        return $response;
    }

    #[Route('/user/create', name: 'create_user')]
    public function createUser(Request $request, EntityManagerInterface $em)
    {
        $user = new User();
        //$user->setName($request->get('name'));
        $user->setName('Loky');
        $user->setLastname('Guerra');
        $user->setEmail('Loky@gmail.com');
        $user->setPassword('123');

        $em->persist($user);
        $em->flush();

        $response = new JsonResponse();
        $response->setData([
            'success' => true,
            'data' => [
                [
                    'id' => $user->getId(),
                    'name' => $user->getName() . ' ' . $user->getLastname(),
                ]
            ]
        ]);
        return $response;
    }
}