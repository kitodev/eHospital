import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  addDoctor(doctor: any) {
    doctor.id = this.afs.createId();
    return this.afs.collection("Doctor/").add(doctor);
  }

  getAllDoctors() {
    return this.afs.collection("Doctor/").snapshotChanges();
  }

  updateDoctor(doctor: any) {
    return this.afs.doc("Doctor/"+doctor.id).update(doctor);
  }

  deleteDoctor(id: string) {
    return this.afs.doc("Doctor/"+id).delete();
  }

  getDoctorById(id: any) {
    return this.afs.doc("Doctor/"+id).valueChanges();
  }

  addPatient(patient : any) {
    patient.patient_id = this.afs.createId();
    return this.afs.collection("Patient/").add(patient);
  }

  getAllPatients() {
    return this.afs.collection("Patient/").snapshotChanges();
  }

  updatePatient(patient: any) {
    return this.afs.doc("Patient/"+patient.patient_id).update(patient);
  }

  deletePatient(id: string) {
    return this.afs.doc("Patient/"+id).delete();
  }

  getPatientById(id: any) {
    return this.afs.doc("Patient/"+id).valueChanges();
  }

  addAppointment(appointment: any) {
    appointment.appointment_id = this.afs.createId();
    return this.afs.collection("Appointment/").add(appointment);
  }

  getAllAppointment() {
    return this.afs.collection("Appointment/").snapshotChanges();
  }

  updateAppointment(appointment: any) {
    return this.afs.doc("Appointment/"+appointment.appointment_id).update(appointment);
  }

  deleteAppointment(id: string) {
    return this.afs.doc("Appointment/"+id).delete();
  }

  getAppointmentById(id: any) {
    return this.afs.doc("Appointment/"+id).valueChanges();
  }

  addPayments(payments: any) {
    payments.payment_id = this.afs.createId();
    return this.afs.collection("Payments/").add(payments);
  }

  getAllPayments() {
    return this.afs.collection("Payments/").snapshotChanges();
  }

  deletePayments(id: string) {
    return this.afs.doc("Payments/"+id).delete();
  }

  addDocuments(documents: any) {
    documents.id = this.afs.createId();
    return this.afs.collection("Documents/").add(documents);
  }

  getAllDocuments() {
    return this.afs.collection("Documents/").snapshotChanges();
  }

  updateDocument(documents: any) {
    return this.afs.doc("Documents/"+documents.id).update(documents);
  }

  deleteDocuments(id: string) {
    return this.afs.doc("Documents/"+id).delete();
  }

  addPackagelist(packages: any) {
    packages.id = this.afs.createId();
    return this.afs.collection("Packagelist/").add(packages);
  }

  getAllPackagelist() {
    return this.afs.collection("Packagelist/").snapshotChanges();
  }

  updatePackagelist(packagelist: any) {
    return this.afs.doc("Packagelist/"+packagelist.id).update(packagelist);
  }

  deletePackagelist(id: string) {
    return this.afs.doc("Packagelist/"+id).delete();
  }

  getAllInvoices() {
    return this.afs.collection("Invoice/").snapshotChanges();
  }

  addInvoice(invoice : any) {
    invoice.id = this.afs.createId();
    return this.afs.collection("Invoice/").add(invoice);
  }

  getInvoiceById(id: string) {
    return this.afs.doc("Invoice/"+id).valueChanges();
  }

  updateInvoice(invoice: any) {
    return this.afs.doc("Invoice/"+invoice.id).update(invoice);
  }

  deleteInvoice(id: string) {
    return this.afs.doc("Invoice/"+id).delete();
  }
}
