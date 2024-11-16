using GarageFlow.Configuration;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;
using FluentEmail.Core;
using FluentEmail.Smtp;
using GarageFlow.Middlewares;

namespace GarageFlow.Services;

public class EmailSender(IOptions<AppSettings> appSettings, ILogger<EmailSender> logger) : IEmailSender
{
    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        try
        {
            string emailAddress = appSettings.Value.EmailCreds.Address;
            string password = appSettings.Value.EmailCreds.Password;
            int port = int.Parse(appSettings.Value.EmailCreds.Port);
            string host = appSettings.Value.EmailCreds.Host;

            var sender = new SmtpSender(() => new SmtpClient(host)
            {
                EnableSsl = true,
                Port = port,
                Credentials = new NetworkCredential(emailAddress, password)
            });

            Email.DefaultSender = sender;

            var emailToSend = Email
                .From(emailAddress)
                .To(email)
                .Subject(subject)
                .Body(htmlMessage, isHtml: true);

            emailToSend.Send();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);
        }
    }
}