import { getServices } from "@/services/api";
import ServicesClient from "./ServicesClient";

export default async function Service() {
  const services = await getServices();

  return <ServicesClient services={services} />;
}