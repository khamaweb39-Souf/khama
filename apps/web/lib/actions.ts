'use server';

import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';

/* ─── Product Actions ────────────────────────────────────────────────── */

export async function addProduct(data: any) {
  try {
    // Note: In a real app, we would get storeId from the session
    const store = await prisma.store.findFirst();
    if (!store) throw new Error("No store found");

    // Get a default category for now (or find by slug)
    const category = await prisma.category.findFirst();
    if (!category) throw new Error("No category found");

    const product = await prisma.product.create({
      data: {
        storeId: store.id,
        categoryId: category.id,
        sku: data.ref || `SKU-${Date.now()}`,
        title: { ar: data.name },
        description: data.description,
        status: 'ACTIVE',
        pricingType: 'FIXED',
        price: parseFloat(data.price) || 0,
        stock: 1000,
        attributes: {
          composition: data.composition,
          gsm: data.gsm,
          width: data.width,
          weave: data.weave,
          certifications: data.certifications,
          leadTime: data.leadTime,
          moq: data.moq
        },
        images: ["/images/fabrics/placeholder.jpg"]
      }
    });

    revalidatePath('/dashboard/supplier/products');
    revalidatePath('/');
    return { success: true, product };
  } catch (error: any) {
    console.error("Error adding product:", error);
    return { success: false, error: error.message };
  }
}

/* ─── RFQ Actions ─────────────────────────────────────────────────────── */

export async function createRFQ(data: any) {
  try {
    // Note: In a real app, we would get buyerId from the session
    const user = await prisma.user.findFirst({ where: { userType: 'CONSUMER' } });
    if (!user) throw new Error("No buyer user found");

    // Get a category
    const category = await prisma.category.findFirst();
    if (!category) throw new Error("No category found");

    const rfq = await prisma.rfqRequest.create({
      data: {
        buyerId: user.id,
        categoryId: category.id,
        productType: data.fabricType,
        quantity: parseInt(data.quantity) || 0,
        unit: 'meter',
        specifications: {
          composition: data.composition,
          gsm: data.gsm,
          width: data.width,
          certifications: data.certifications,
          incoterm: data.incoterm,
          targetRegions: data.targetRegions,
          budget: data.budget
        },
        urgency: data.deadline.includes('ساعات') ? 'URGENT' : 'NORMAL',
        status: 'SUBMITTED'
      }
    });

    revalidatePath('/rfq');
    revalidatePath('/dashboard/buyer/rfq');
    return { success: true, rfq };
  } catch (error: any) {
    console.error("Error creating RFQ:", error);
    return { success: false, error: error.message };
  }
}

/* ─── Data Fetching Actions ──────────────────────────────────────────── */

export async function getActiveRFQs() {
  try {
    const rfqs = await prisma.rfqRequest.findMany({
      where: { status: 'SUBMITTED' },
      include: { buyer: true },
      orderBy: { createdAt: 'desc' }
    });
    return rfqs;
  } catch (error) {
    console.error("Error fetching RFQs:", error);
    return [];
  }
}
