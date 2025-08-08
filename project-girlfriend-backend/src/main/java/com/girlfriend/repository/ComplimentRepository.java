package com.girlfriend.repository;

import com.girlfriend.entity.ComplimentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplimentRepository extends JpaRepository<ComplimentEntity,Long> {


}
