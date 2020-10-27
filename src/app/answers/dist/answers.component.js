"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AnswersComponent = void 0;
var dialog_answer_component_1 = require("../dialog-answer/dialog-answer.component");
var core_1 = require("@angular/core");
var dialog_edit_component_1 = require("../dialog-edit/dialog-edit.component");
var AnswersComponent = /** @class */ (function () {
    function AnswersComponent(answerService, dialog, route, router) {
        this.answerService = answerService;
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        this.answers = [];
        var state = this.router.getCurrentNavigation().extras.state;
        if (!state) {
            this.router.navigateByUrl('/questions');
            return;
        }
        this.question = state.question;
    }
    AnswersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.questionId = params.id;
            _this.getAllAnswers();
        });
    };
    AnswersComponent.prototype.getAllAnswers = function () {
        var _this = this;
        this.answerService.getAnswers(this.questionId).subscribe(function (answers) {
            _this.answers = answers;
        });
    };
    AnswersComponent.prototype.createAnswerDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_answer_component_1.DialogAnswerComponent, {
            height: '300px',
            width: '300px'
        });
        dialogRef.afterClosed().subscribe(function (text) {
            if (text && text.trim()) {
                _this.question.answerLength += 1;
                _this.answerService.createAnswer(text, _this.questionId, _this.question.answerLength).subscribe(function () {
                    _this.getAllAnswers();
                });
            }
        });
    };
    AnswersComponent.prototype.deleteAnswer = function (objectId) {
        var _this = this;
        this.question.answerLength = this.question.answerLength - 1;
        this.answerService.deleteAnswer(objectId, this.question.objectId, this.question.answerLength).subscribe(function () {
            _this.answers = _this.answers.filter(function (answer) { return answer.objectId !== objectId; });
            _this.getAllAnswers();
        });
    };
    AnswersComponent.prototype.editAnswerDialog = function (answer) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_edit_component_1.DialogEditComponent, {
            height: '300px',
            width: '300px'
        });
        dialogRef.afterClosed().subscribe(function (text) {
            if (text.trim()) {
                _this.answerService.editAnswers(text, answer.objectId).subscribe(function (text) {
                    _this.answers = _this.answers.filter(function (_a) {
                        var objectId = _a.objectId;
                        return answer.objectId !== objectId;
                    });
                    _this.answers = __spreadArrays(_this.answers, [__assign({ objectId: answer.objectId }, text)]);
                    _this.getAllAnswers();
                });
            }
        });
    };
    AnswersComponent = __decorate([
        core_1.Component({
            selector: 'app-answers',
            templateUrl: './answers.component.html',
            styleUrls: ['./answers.component.scss']
        })
    ], AnswersComponent);
    return AnswersComponent;
}());
exports.AnswersComponent = AnswersComponent;
