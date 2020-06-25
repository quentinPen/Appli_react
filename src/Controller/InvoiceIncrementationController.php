<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class InvoiceIncrementationController extends AbstractController
{
    /**
     * Undocumented variable
     *
     * @var ObjectManager
     */
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }
    /** 
     *
     * @param Invoice $data
     * @return void
     */
    public function __invoke(Invoice $data)
    {
        $data->setChrono($data->getChrono()+1);
        $this->manager->persist($data);
        $this->manager->flush();;
        return $data;
    }
}
