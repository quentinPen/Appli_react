<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Invoice;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method Invoice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Invoice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Invoice[]    findAll()
 * @method Invoice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InvoiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Invoice::class);
    }

    /**
     * Undocumented function
     *
     * @param User $user
     * @return void
     */
    public function getNextChrono(User $user)
    {
        return $this->createQueryBuilder('i')
            ->select("i.chrono")
            ->join("i.customer", "c")
            ->where("c.user = :user")
            ->setParameter("user", $user)
            ->orderBy("i.chrono", "DESC")
            ->setMaxResults(1)
            ->getQuery()
            ->getSingleScalarResult() +1;
    }
}
