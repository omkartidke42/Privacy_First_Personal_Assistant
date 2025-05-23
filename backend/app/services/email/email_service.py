# backend/app/email/email_service.py

import imaplib
import email
from email.header import decode_header
import os

def fetch_recent_emails(email_address, password, imap_server="imap.gmail.com", num_emails=1):
    try:
        mail = imaplib.IMAP4_SSL(imap_server)
        mail.login(email_address, password)
        mail.select("inbox")

        status, messages = mail.search(None, "ALL")
        mail_ids = messages[0].split()[-num_emails:]

        emails = []
        for mail_id in reversed(mail_ids):
            status, msg_data = mail.fetch(mail_id, "(RFC822)")
            msg = email.message_from_bytes(msg_data[0][1])
            subject, encoding = decode_header(msg["Subject"])[0]
            subject = subject.decode(encoding) if isinstance(subject, bytes) else subject
            from_ = msg.get("From")

            emails.append({"from": from_, "subject": subject})

        mail.logout()
        return emails

    except Exception as e:
        return {"error": str(e)}
