import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  url = "http://localhost:3000/result";
  
  studentData = new EventEmitter<any>();
  
  constructor(private http:HttpClient) { }
  
  getList() {
    //console.log("Result List")
    return this.http.get(this.url);
  }

  addResult(data:any) {
    
    //console.warn('Result Service : '+data)
    return this.http.post(this.url,data);
  }

  updateResult(id:any ,data:any) {

    return this.http.put(`${this.url}/${id}`, data)
  }

  deleteResult(id:any) {

    return this.http.delete(`${this.url}/${id}`);
  }

  getResult(rollNo:any) {

    return this.http.get(`${this.url}?rollno=${rollNo}`);
  }

  dataEmit(data:any) {
    this.studentData.emit(data)
  }

}

interface Article {
  rollno: number;
  name: string;
  dob: string;
  score: number;
}
