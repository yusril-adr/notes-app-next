/* eslint-disable no-unused-vars */
export enum CONFIG {
  HEADER_HEIGHT = "64px",
  FOOTER_HEIGHT = "88px",
  MIN_BODY_HEIGHT = `calc(100vh - ${CONFIG.HEADER_HEIGHT} - ${CONFIG.FOOTER_HEIGHT})`,
  DEFAULT_ERROR_MESSAGE = "Terjadi kesalahan dari server.",
}
