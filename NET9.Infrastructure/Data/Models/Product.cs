﻿using System;
using System.Collections.Generic;

namespace NET9.Infrastructure.Data.Models;

public partial class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public decimal? Price { get; set; }
}
