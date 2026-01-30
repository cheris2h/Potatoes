package com.potatoes.backend.repository;

import com.potatoes.backend.domain.Report;
import com.potatoes.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUserOrderByIdDesc(User user);
}
