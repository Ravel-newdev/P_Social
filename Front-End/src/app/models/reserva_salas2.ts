import { reservas_salas } from "./reserva_salas";

export interface reservas_salas2 extends reservas_salas{
    _id: string;
    desc: string;
    cod_user: string;
    cod_sala: number;
    cod_reserva: number;
    date_reserv: string;
    date_entrega: string;
    hora_reserva: string;
    hora_entrega: string;
}
