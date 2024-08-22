<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegisterAction extends AbstractController
{
    public function __invoke(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        UserRepository $userRepository,
        ValidatorInterface $validator,
        EntityManagerInterface $em,
        JWTTokenManagerInterface $jwtManager // Inject the JWTManager
    ): Response {
        $data = json_decode($request->getContent(), true);

        // Validate input data
        if (empty($data['email']))
            return $this->json(['Error'=>'El email es obligatorio.'], Response::HTTP_BAD_REQUEST);
        if(empty($data['password']))
            return $this->json(['Error'=>'Debe ingresar su contraseña.'], Response::HTTP_BAD_REQUEST);
        if(empty($data['name']))
            return $this->json(['Error'=>'El nombre es obligatorio.'], Response::HTTP_BAD_REQUEST);
        if(empty($data['lastname']))
            return $this->json(['Error'=>'El apellido es obligatorio.'], Response::HTTP_BAD_REQUEST);

        $existingUser = $userRepository->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return $this->json(['Error' => 'El email ya está registrado.'], Response::HTTP_BAD_REQUEST);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setName($data['name']);
        $user->setLastname($data['lastname']);
        $user->setRoles(['ROLE_USER']);

        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return $this->json(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $em->persist($user);
        $em->flush();

        // Generate the JWT token
        $token = $jwtManager->create($user);

        return $this->json([
            'message' => 'Usuario registrado',
            'token' => $token, // Include the token in the response
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'name' => $user->getName(),
                'lastname' => $user->getLastname()
            ]
        ], Response::HTTP_CREATED);
    }
}
