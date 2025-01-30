using AutoMapper;
using GarageFlow.CQRS.RepairDetail;
using GarageFlow.Enums;
using GarageFlow.Middlewares.Exceptions;
using GarageFlow.Repositories.RepairDetailRepository;
using GarageFlow.Repositories.RepairRepository;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MigraDoc.DocumentObjectModel;
using MigraDoc.Rendering;
using PdfSharp.Pdf;

namespace GarageFlow.CQRS.Repair.Queries.GetInvoice;

public class GetInvoiceQueryHandler(IMapper mapper,
    IRepairRepository repairRepository,
    IRepairDetailRepository repairDetailRepository) : IRequestHandler<GetInvoiceQuery, IActionResult>
{
    public async Task<IActionResult> Handle(GetInvoiceQuery request, CancellationToken cancellationToken)
    {
        var repair = await repairRepository.GetRepairById(request.RepairId, cancellationToken);

        if (repair == null)
        {
            throw new NotFoundException(nameof(Repair), request.RepairId.ToString());
        }

        if (repair.Status != RepairStatus.Done)
        {
            throw new BadRequestException($"Repair {repair.Id} should be Done instead of {repair.Status}");
        }

        var invoice = mapper.Map<InvoiceResponse>(repair);
        var repairDetails = await repairDetailRepository.GetRepairDetailsByRepairId(repair.Id, cancellationToken);
        invoice.CustomerAddress = request.CustomerAddress;
        invoice.Nip = request.Nip;

        invoice.RepairDetails = mapper.Map<List<RepairDetailResponse>>(repairDetails);
        invoice.Price = invoice.RepairDetails.Sum(rd => rd.Price);

        var document = GeneratePdf();
        MemoryStream stream = new();
        document.Save(stream);

        byte[] bytes = stream.ToArray();
        stream.Close();

        return new FileContentResult(bytes, "application/pdf")
        {
            FileDownloadName = "invoice.pdf"
        };

        //return invoice;
    }

    public PdfDocument GeneratePdf()
    {
        var document = new Document();

        BuildDocument(document);

        var pdfRenderer = new PdfDocumentRenderer();

        pdfRenderer.Document = document;

        pdfRenderer.RenderDocument();

        return pdfRenderer.PdfDocument;
    }

    private void BuildDocument(Document document)
    {
        Section section = document.AddSection();

        var paragraph = section.AddParagraph();
        paragraph.AddText("Invoice");
    }
}