// src/interfaces/CreatePollDTO.ts

import { IConfiguration, IQuestion } from "@/models/Poll";

export interface CreatePollDTO {
  title: string;
  subtitle?: string;
  questions: IQuestion[];
  config: IConfiguration;
}
