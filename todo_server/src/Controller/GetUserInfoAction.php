<?php

namespace App\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class GetUserInfoAction extends AbstractController
{
    public function __invoke(
        Request $request,
        TokenStorageInterface $tokenStorageInterface,
        JWTTokenManagerInterface $jwtManager
    ): Response {

        $token = $tokenStorageInterface->getToken();

        if (!$token || !$token->getCredentials()) {
            throw new AuthenticationException('No token found or token is invalid.');
        }

        $jwt = $token->getCredentials(); // assuming the token credentials are the JWT token
        $decodedJwtToken = $jwtManager->decode($jwt);

        if (!$decodedJwtToken) {
            throw new AuthenticationException('Unable to decode the JWT token.');
        }

        // Make sure the token has the expected claims
        $userId = $decodedJwtToken['id'] ?? null;
        if (!$userId) {
            throw new AuthenticationException('User ID not found in token.');
        }

        return $this->json([
            'user' => [
                'id' => $userId,
            ]
        ], Response::HTTP_OK);
    }
}
