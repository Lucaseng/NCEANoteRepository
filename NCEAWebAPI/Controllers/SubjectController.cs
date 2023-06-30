﻿using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data;
using NCEAWebRepo.Models;

namespace NCEAWebRepo.Controllers
{
    [Route("api/subjects")]
    [ApiController]
    public class SubjectController : Controller
    {
        private readonly INCEAWebRepo _repository;

        public SubjectController(INCEAWebRepo repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public ActionResult<IEnumerable<Subject>> AllSubjects()
        {
            IEnumerable<Subject> subjects = _repository.GetSubjects();
            return Ok(subjects);
        }

    }
}