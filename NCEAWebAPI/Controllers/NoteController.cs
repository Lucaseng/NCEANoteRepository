﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NCEAWebRepo.Data.Notes;
using NCEAWebRepo.Dtos;
using NCEAWebRepo.Models;
using System.Collections;

namespace NCEAWebRepo.Controllers
{
    [Route("api/notes")]
    [ApiController]
    public class NoteController : Controller
    {
        private readonly INoteRepo _repository;
        public NoteController(INoteRepo repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public ActionResult<IEnumerable<Note>> AllNotes()
        {
            IEnumerable<Note> notes = _repository.GetNotes();
            return Ok(notes);
        }

        [HttpGet("search")]
        public ActionResult<ArrayList> Search(int endIndex, int startIndex = 0, String? keyword = "", String? level = "", String? assessment = "")
        {
            ArrayList notes = _repository.SearchNotes(endIndex, startIndex, keyword, level, assessment);
            return Ok(notes);
        }

        [HttpGet("id")]
        public ActionResult<Note> GetNotebyId(int id)
        {
            Note note = _repository.GetNoteByID(id);
            if (note == null)
            {
                return BadRequest(new FailDto
                {
                    fail = String.Format("No note exists with id {0}!", id)
                });
            }
            else
            {
                return Ok(note);
            }

        }

        [HttpGet("standard")]
        public ActionResult<IEnumerable<Note>> GetNotesByStandard(int Standard_ID)
        {
            IEnumerable<Note> notes = _repository.GetNotesByStandard(Standard_ID);
            return Ok(notes);
        }

        [Authorize(AuthenticationSchemes = "UserAuth")]
        [Authorize(Policy = "UserOnly")]
        [HttpPost()]
        public ActionResult<String> AddNote(NoteInputDto note)
        {
            return Ok(_repository.AddNote(note));

        }
    }
}
