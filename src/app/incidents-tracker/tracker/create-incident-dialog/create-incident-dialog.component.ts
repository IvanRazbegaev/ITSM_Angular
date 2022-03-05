import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-incident-dialog',
  templateUrl: './create-incident-dialog.component.html',
  styleUrls: ['./create-incident-dialog.component.css'],

})
export class CreateIncidentDialogComponent implements OnInit {


  incident: {incStart: string, incEnd: string, incLength: number, desc: string, comments: string} = {
    incStart: '',
    incEnd: '',
    incLength: 1,
    desc: '',
    comments: ''
  }

  form = new FormGroup({
    timeFrom: new FormControl(new Date(Date.now() - 2 * 60 * 1000)),
    timeTo: new FormControl(new Date(Date.now())),
    description: new FormControl(),
    comments: new FormControl(),
    firstNode: new FormControl(),
    secondNode: new FormControl(),
    thirdNode: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  getCheckedNodes(): any[] {
    const res: any[] = [];
    const firstNodeCheckbox = this.form.get("firstNode")?.value
    const secondNodeCheckbox = this.form.get("secondNode")?.value
    const thirdNodeCheckbox = this.form.get("thirdNode")?.value

    res.push(firstNodeCheckbox, secondNodeCheckbox, thirdNodeCheckbox)

    return res
  }


  getFormValues(): {from: any, to: any, incLength: number, desc: string, comments: string} {
    const from = this.form.get("timeFrom")?.value;
    const to = this.form.get("timeTo")?.value;
    const incLength = (to - from)/(60 * 1000) - 2; //Вычисляем длину инцидента. Для обеспечения однородности данных уменьшаем длину на 2 минуты, поскольку в incident-pipe к длине прибавляется 2 минуты (данные из инфлюкс/прометеуса показывают только выброс, т.е. выброс не учитывает начало + конец инцидента)
    let desc = this.form.get("description")?.value;
    const comments = this.form.get("comments")?.value;
    const checkedNodes = this.getCheckedNodes();
    for (let i = 0; i < checkedNodes.length; i++) {
      if(checkedNodes[i]){
        desc += `, loggingdb${i + 1}`
      }
    }

    return {from, to, incLength, desc, comments};
  }
}
