import React, { useState, useEffect, useMemo } from 'react';

// --- Helper Functions & Initial Data ---

// A simple unique ID generator for new items
const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

// Get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const todayWithOffset = new Date(today.getTime() - (offset*60*1000));
    return todayWithOffset.toISOString().split('T')[0];
}


// Initial data to make the app feel alive on first load.
const INITIAL_STAFF = [
  { id: 's1', name: 'Ramesh Kumar', role: 'Head Chef', salary: 350, salaryBasis: 'Per Day', isActive: true },
  { id: 's2', name: 'Suresh Singh', role: 'Production Staff', salary: 250, salaryBasis: 'Per Day', isActive: true },
  { id: 's3', name: 'Priya Sharma', role: 'Production Staff', salary: 250, salaryBasis: 'Per Day', isActive: true },
  { id: 's4', name: 'Amit Patel', role: 'Helper', salary: 150, salaryBasis: 'Per Day', isActive: true },
  { id: 's5', name: 'Sunita Devi', role: 'Packaging', salary: 7500, salaryBasis: 'Per Month', isActive: false },
];

const INITIAL_INGREDIENT_PRICES = [
    { id: 'i1', name: 'Chakki Atta', price: 1254, perAmount: 30, unit: 'kg' },
    { id: 'i2', name: 'Atta (Regular)', price: 1177, perAmount: 30, unit: 'kg' },
    { id: 'i3', name: 'Oil', price: 1495, perAmount: 10, unit: 'pcs' },
    { id: 'i4', name: 'Preservative Powder', price: 1170, perAmount: 1, unit: 'kg' },
    { id: 'i5', name: 'Preservative Oil', price: 1170, perAmount: 1, unit: 'kg' },
    { id: 'i6', name: 'Salt', price: 30, perAmount: 1, unit: 'kg' },
    { id: 'i7', name: 'Packaging Cover', price: 0.98, perAmount: 1, unit: 'pc' }, // Added for auto-calculation
];

const EMPTY_DAILY_RECORD = {
    attendance: {},
    production: { chapatiDoughKg: 0, pooriDoughKg: 0 },
    sales: [],
    expenses: [],
    returns: [],
    calculated: { labourCost: 0 }
};


// --- Main Dashboard Component ---
export default function Dashboard() { // Renamed from App to Dashboard
  // State for navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for staff members
  const [staff, setStaff] = useState(() => JSON.parse(localStorage.getItem('myflav_staff')) || INITIAL_STAFF);

  // State for ingredient prices
  const [ingredients, setIngredients] = useState(() => JSON.parse(localStorage.getItem('myflav_ingredients')) || INITIAL_INGREDIENT_PRICES);

  // State for all daily records, keyed by date string
  const [dailyRecords, setDailyRecords] = useState(() => JSON.parse(localStorage.getItem('myflav_daily_records')) || {});

  // Effects to save data to localStorage
  useEffect(() => { localStorage.setItem('myflav_staff', JSON.stringify(staff)); }, [staff]);
  useEffect(() => { localStorage.setItem('myflav_ingredients', JSON.stringify(ingredients)); }, [ingredients]);
  useEffect(() => { localStorage.setItem('myflav_daily_records', JSON.stringify(dailyRecords)); }, [dailyRecords]);

  // Handlers for staff
  const addStaff = (newStaffMember) => setStaff([...staff, { ...newStaffMember, id: generateId(), isActive: true }]);
  const updateStaff = (updatedStaffMember) => setStaff(staff.map(s => s.id === updatedStaffMember.id ? updatedStaffMember : s));
  
  // Handlers for ingredients
  const updateIngredient = (updatedIngredient) => setIngredients(ingredients.map(i => i.id === updatedIngredient.id ? updatedIngredient : i));
  
  // Handler for daily records
  const updateDailyRecord = (date, updatedRecord) => {
      setDailyRecords(prev => ({ ...prev, [date]: updatedRecord }));
  }

  return (
    <>
      <style>{`
        .button-primary { @apply w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300; }
        .button-secondary { @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300; }
        .button-success { @apply bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300; }
        .form-input { @apply mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500; }
        .form-select { @apply mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500; }
        .label { @apply block text-sm font-medium text-gray-700; }
        .th { @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider; }
        .td { @apply px-6 py-4 whitespace-nowrap text-sm text-gray-500; }
      `}</style>
      <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-6 bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            {activeTab === 'dashboard' && <DashboardPage dailyRecords={dailyRecords} ingredients={ingredients} />}
            {activeTab === 'daily_entry' && (
              <DailyEntry 
                  staff={staff} 
                  ingredients={ingredients}
                  dailyRecords={dailyRecords}
                  updateDailyRecord={updateDailyRecord}
              />
            )}
            {activeTab === 'reports' && <Reports dailyRecords={dailyRecords} />}
            {activeTab === 'settings' && (
              <Settings 
                staff={staff} 
                addStaff={addStaff} 
                updateStaff={updateStaff}
                ingredients={ingredients}
                updateIngredient={updateIngredient}
              />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

// --- UI Components ---

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <svg className="w-10 h-10 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01v.01M12 18v-1m0-1v-.01m0-1V14m0 2.01v.01M12 20v-1m0-1v-.01m0-1V16m0 2.01v.01M6 12H5m1 0h.01M4 12H3m1 0h.01M18 12h1m-1 0h-.01m2 0h1m-1 0h-.01M8 16l-1 1m1-1l.01.01M8 8l-1-1m1 1l.01-.01m8 8l1 1m-1-1l-.01.01m0-8l1-1m-1 1l-.01-.01" /></svg>
          <h1 className="text-2xl font-bold text-gray-800">MyFlav Foods</h1>
        </div>
        <div className="flex items-center">
            <span className="text-sm mr-4 hidden sm:inline">Admin User</span>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Logout
            </button>
        </div>
      </div>
    </div>
  </header>
);

const Nav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'daily_entry', label: 'Daily Entry' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="bg-gray-200 rounded-lg p-1 flex space-x-1">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full py-2 px-3 text-sm sm:text-base font-medium rounded-md transition-colors duration-300 ${
            activeTab === item.id
              ? 'bg-white text-orange-600 shadow'
              : 'text-gray-600 hover:bg-white/60'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

const Footer = () => (
    <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MyFlav Foods. All Rights Reserved.</p>
    </footer>
);


// --- Page/Tab Components ---

const DashboardPage = ({ dailyRecords, ingredients }) => {
    const [selectedDate, setSelectedDate] = useState(getTodayDateString());

    const stats = useMemo(() => {
        const record = dailyRecords[selectedDate] || EMPTY_DAILY_RECORD;
        const coverPrice = ingredients.find(i => i.name === 'Packaging Cover')?.price || 0;
        
        const totalSales = record.sales.reduce((sum, s) => {
            const saleBase = (s.units || 0) * (s.price || 0);
            const packingCost = (s.productType === 'Chapati' && s.packaging === 'With Cover') 
                ? (s.units || 0) * coverPrice 
                : 0;
            return sum + saleBase + packingCost;
        }, 0);
        
        const totalCreditSales = record.sales
            .filter(s => s.type === 'Credit')
            .reduce((sum, s) => {
                const saleBase = (s.units || 0) * (s.price || 0);
                const packingCost = (s.productType === 'Chapati' && s.packaging === 'With Cover') ? (s.units || 0) * coverPrice : 0;
                return sum + saleBase + packingCost;
            }, 0);

        const totalExpenses = record.expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
        
        // Ingredient Cost Calculation
        const getPrice = (name) => (ingredients.find(i => i.name === name)?.price || 0) / (ingredients.find(i => i.name === name)?.perAmount || 1);
        const chapatiDoughKg = record.production.chapatiDoughKg || 0;
        const pooriDoughKg = record.production.pooriDoughKg || 0;
        const totalDough = chapatiDoughKg + pooriDoughKg;
        
        // Assuming 15kg dough recipe for calculation base
        const batches = totalDough / 15;
        const ingredientCost = batches * (
            (9 * getPrice('Atta (Regular)')) +
            (6 * getPrice('Chakki Atta')) +
            (1.2 * getPrice('Oil')) + // 1200g = 1.2kg
            (0.05 * getPrice('Preservative Powder')) + // 50g = 0.05kg
            (0.05 * getPrice('Preservative Oil')) + // 50g = 0.05kg
            (0.2 * getPrice('Salt')) // 200g = 0.2kg
        );

        const labourCost = record.calculated.labourCost || 0;
        const netProfit = totalSales - totalExpenses - labourCost - ingredientCost;
        
        return {
            totalSales: totalSales.toFixed(2),
            totalCreditSales: totalCreditSales.toFixed(2),
            totalExpenses: totalExpenses.toFixed(2),
            ingredientCost: ingredientCost.toFixed(2),
            netProfit: netProfit.toFixed(2)
        };
    }, [selectedDate, dailyRecords, ingredients]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={e => setSelectedDate(e.target.value)}
                    className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-orange-100 p-6 rounded-lg shadow"><h3 className="font-bold text-lg text-orange-800">Net Profit</h3><p className="text-3xl font-bold text-orange-600 mt-2">₹{stats.netProfit}</p></div>
                <div className="bg-blue-100 p-6 rounded-lg shadow"><h3 className="font-bold text-lg text-blue-800">Total Sales</h3><p className="text-3xl font-bold text-blue-600 mt-2">₹{stats.totalSales}</p></div>
                <div className="bg-yellow-100 p-6 rounded-lg shadow"><h3 className="font-bold text-lg text-yellow-800">Credit Sales</h3><p className="text-3xl font-bold text-yellow-600 mt-2">₹{stats.totalCreditSales}</p></div>
                <div className="bg-red-100 p-6 rounded-lg shadow"><h3 className="font-bold text-lg text-red-800">Total Expenses</h3><p className="text-3xl font-bold text-red-600 mt-2">₹{stats.totalExpenses}</p></div>
                <div className="bg-green-100 p-6 rounded-lg shadow"><h3 className="font-bold text-lg text-green-800">Ingredient Cost</h3><p className="text-3xl font-bold text-green-600 mt-2">₹{stats.ingredientCost}</p></div>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Coming Soon: Charts & Graphs</h3>
                <div className="bg-gray-200 rounded-lg p-10 text-center text-gray-500">
                    Profit Trends, Dough Usage, and other visual reports will be displayed here.
                </div>
            </div>
        </div>
    );
};

const DailyEntry = ({ staff, ingredients, dailyRecords, updateDailyRecord }) => {
    const [selectedDate, setSelectedDate] = useState(getTodayDateString());
    
    // State for managing edit modals
    const [editingItem, setEditingItem] = useState(null);
    const [modalType, setModalType] = useState(null);

    const openEditModal = (item, type) => {
        setEditingItem(item);
        setModalType(type);
    };

    const closeEditModal = () => {
        setEditingItem(null);
        setModalType(null);
    };

    const currentRecord = useMemo(() => {
        const initialAttendance = staff.filter(s => s.isActive).reduce((acc, s) => ({...acc, [s.id]: 'Present'}), {});
        const record = dailyRecords[selectedDate] || { ...EMPTY_DAILY_RECORD, attendance: initialAttendance };
        if (!record.attendance || Object.keys(record.attendance).length === 0) {
            record.attendance = initialAttendance;
        }
        return record;
    }, [selectedDate, dailyRecords, staff]);

    // Handlers to update parts of the daily record
    const updateField = (field, value) => {
        updateDailyRecord(selectedDate, { ...currentRecord, [field]: value });
    };
    
    const updateProductionField = (prodField, value) => {
        updateField('production', { ...currentRecord.production, [prodField]: value });
    };

    const updateList = (listName, updatedItem) => {
        const updatedList = currentRecord[listName].map(item => item.id === updatedItem.id ? updatedItem : item);
        updateField(listName, updatedList);
        closeEditModal();
    };

    const addToList = (listName, item) => {
        updateField(listName, [...currentRecord[listName], { ...item, id: generateId() }]);
    };

    const removeFromList = (listName, itemId) => {
        updateField(listName, currentRecord[listName].filter(item => item.id !== itemId));
    };

    // Form states
    const [newSale, setNewSale] = useState({ productType: 'Chapati', name: '', units: '', price: '', type: 'Cash', packaging: 'With Cover' });
    const [newExpense, setNewExpense] = useState({ category: 'Ingredients', amount: '', description: '' });
    const [newReturn, setNewReturn] = useState({ productType: 'Chapati', name: '', units: '', pricePerUnit: '' });

    
    // Auto-calculate costs
    useEffect(() => {
        const labourCost = staff.reduce((total, s) => {
            if (currentRecord.attendance[s.id] === 'Present') {
                return total + (s.salaryBasis === 'Per Month' ? s.salary / 30 : s.salary);
            }
            return total;
        }, 0);

        if (labourCost !== currentRecord.calculated.labourCost) {
            updateDailyRecord(selectedDate, {
                ...currentRecord,
                calculated: { ...currentRecord.calculated, labourCost }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRecord.attendance, staff, selectedDate]);


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Daily Entry</h2>
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={e => setSelectedDate(e.target.value)}
                    className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Entry Forms */}
                <div className="space-y-6">
                    <Section title="1. Dough Production">
                        <div className="space-y-4">
                            <label className="block"><span className="text-gray-700">Chapati Dough (kg)</span><input type="number" value={currentRecord.production.chapatiDoughKg || ''} onChange={e => updateProductionField('chapatiDoughKg', parseFloat(e.target.value) || 0)} className="mt-1 block w-full form-input" /></label>
                            <label className="block"><span className="text-gray-700">Poori Dough (kg)</span><input type="number" value={currentRecord.production.pooriDoughKg || ''} onChange={e => updateProductionField('pooriDoughKg', parseFloat(e.target.value) || 0)} className="mt-1 block w-full form-input" /></label>
                        </div>
                    </Section>

                    <Section title="2. Sales">
                        <form onSubmit={(e) => { e.preventDefault(); addToList('sales', newSale); setNewSale({ productType: 'Chapati', name: '', units: '', price: '', type: 'Cash', packaging: 'With Cover' }); }} className="space-y-3">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <select value={newSale.productType} onChange={e => setNewSale({...newSale, productType: e.target.value})} className="form-select"><option>Chapati</option><option>Poori</option></select>
                                <input type="text" placeholder="Customer Name" value={newSale.name} onChange={e => setNewSale({...newSale, name: e.target.value})} className="form-input" required />
                                <input type="number" placeholder="Units" value={newSale.units} onChange={e => setNewSale({...newSale, units: parseFloat(e.target.value) || ''})} className="form-input" required />
                                <input type="number" placeholder="Price/Unit" value={newSale.price} onChange={e => setNewSale({...newSale, price: parseFloat(e.target.value) || ''})} className="form-input" required />
                                {newSale.productType === 'Chapati' && (<select value={newSale.packaging} onChange={e => setNewSale({...newSale, packaging: e.target.value})} className="form-select"><option>With Cover</option><option>Without Cover</option></select>)}
                                <select value={newSale.type} onChange={e => setNewSale({...newSale, type: e.target.value})} className={`form-select ${newSale.productType === 'Chapati' ? '' : 'col-span-2'}`}><option>Cash</option><option>Credit</option></select>
                            </div>
                            <button type="submit" className="button-primary">Add Sale</button>
                        </form>
                    </Section>

                    <Section title="3. Expenses">
                        <form onSubmit={(e) => { e.preventDefault(); addToList('expenses', newExpense); setNewExpense({ category: 'Ingredients', amount: '', description: '' }); }} className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <select value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})} className="form-select"><option>Ingredients</option><option>Transport</option><option>Packing</option><option>Salaries</option><option>Other</option></select>
                                <input type="number" placeholder="Amount (₹)" value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || ''})} className="form-input" required />
                            </div>
                            <input type="text" placeholder="Description" value={newExpense.description} onChange={e => setNewExpense({...newExpense, description: e.target.value})} className="form-input col-span-2" />
                            <button type="submit" className="button-primary">Add Expense</button>
                        </form>
                    </Section>

                    <Section title="4. Returns">
                         <form onSubmit={(e) => { e.preventDefault(); addToList('returns', newReturn); setNewReturn({ productType: 'Chapati', name: '', units: '', pricePerUnit: '' }); }} className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <select value={newReturn.productType} onChange={e => setNewReturn({...newReturn, productType: e.target.value})} className="form-select"><option>Chapati</option><option>Poori</option></select>
                                <input type="text" placeholder="Customer Name" value={newReturn.name} onChange={e => setNewReturn({...newReturn, name: e.target.value})} className="form-input" required />
                                <input type="number" placeholder="Units Returned" value={newReturn.units} onChange={e => setNewReturn({...newReturn, units: parseFloat(e.target.value) || ''})} className="form-input" required />
                                <input type="number" placeholder="Price per Unit (₹)" value={newReturn.pricePerUnit} onChange={e => setNewReturn({...newReturn, pricePerUnit: parseFloat(e.target.value) || ''})} className="form-input" required />
                            </div>
                            <button type="submit" className="button-primary">Add Return</button>
                        </form>
                    </Section>
                </div>

                {/* Right Column: Summary & Attendance */}
                <div className="space-y-6">
                    <Section title="Today's Summary">
                        <div className="space-y-4">
                            <SummaryList type="sales" title="Sales" items={currentRecord.sales} onRemove={id => removeFromList('sales', id)} onEdit={item => openEditModal(item, 'sale')} ingredients={ingredients} />
                            <SummaryList type="expenses" title="Expenses" items={currentRecord.expenses} onRemove={id => removeFromList('expenses', id)} onEdit={item => openEditModal(item, 'expense')} />
                            <SummaryList type="returns" title="Returns" items={currentRecord.returns} onRemove={id => removeFromList('returns', id)} onEdit={item => openEditModal(item, 'return')} />
                        </div>
                    </Section>

                    <IngredientCostSummary production={currentRecord.production} ingredients={ingredients} />
                    
                     <Section title="Staff Attendance">
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                            {staff.filter(s => s.isActive).map(s => (
                                <div key={s.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                                    <span className="text-sm font-medium">{s.name}</span>
                                    <div>
                                        <button onClick={() => updateField('attendance', {...currentRecord.attendance, [s.id]: 'Present'})} className={`px-2 py-1 text-xs rounded ${currentRecord.attendance[s.id] === 'Present' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>P</button>
                                        <button onClick={() => updateField('attendance', {...currentRecord.attendance, [s.id]: 'Absent'})} className={`px-2 py-1 text-xs rounded ml-1 ${currentRecord.attendance[s.id] === 'Absent' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>A</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-right mt-3 font-semibold text-blue-600">Calculated Labour Cost: ₹{currentRecord.calculated.labourCost.toFixed(2)}</div>
                    </Section>
                </div>
            </div>

            {modalType === 'sale' && <SaleFormModal item={editingItem} onSave={updateList} onClose={closeEditModal} />}
            {modalType === 'expense' && <ExpenseFormModal item={editingItem} onSave={updateList} onClose={closeEditModal} />}
            {modalType === 'return' && <ReturnFormModal item={editingItem} onSave={updateList} onClose={closeEditModal} />}
        </div>
    );
};

// Helper component for section styling
const Section = ({ title, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">{title}</h3>
        {children}
    </div>
);

const IngredientCostSummary = ({ production, ingredients }) => {
    const costBreakdown = useMemo(() => {
        const getPrice = (name) => (ingredients.find(i => i.name === name)?.price || 0) / (ingredients.find(i => i.name === name)?.perAmount || 1);
        const totalDough = (production.chapatiDoughKg || 0) + (production.pooriDoughKg || 0);

        if (totalDough === 0) return { breakdown: [], total: 0 };

        const batches = totalDough / 15;
        const recipe = [
            { name: 'Atta (Regular)', amount: 9, unit: 'kg' },
            { name: 'Chakki Atta', amount: 6, unit: 'kg' },
            { name: 'Oil', amount: 1.2, unit: 'kg' },
            { name: 'Preservative Powder', amount: 50, unit: 'g' },
            { name: 'Preservative Oil', amount: 50, unit: 'g' },
            { name: 'Salt', amount: 200, unit: 'g' },
        ];

        const breakdown = recipe.map(item => {
            const pricePerKg = item.unit === 'g' ? getPrice(item.name) / 1000 : getPrice(item.name);
            const consumedAmount = item.amount * batches;
            const cost = consumedAmount * pricePerKg;
            return { name: item.name, consumption: `${consumedAmount.toFixed(2)} ${item.unit}`, cost: cost.toFixed(2) };
        });

        const total = breakdown.reduce((sum, item) => sum + parseFloat(item.cost), 0);

        return { breakdown, total };
    }, [production, ingredients]);

    return (
        <Section title="Ingredient Cost Breakdown">
            {costBreakdown.breakdown.length === 0 ? <p className="text-sm text-gray-500 mt-2">Enter dough production to see cost breakdown.</p> : (
                 <div className="overflow-x-auto mt-2">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-1 font-medium">Ingredient</th>
                                <th className="py-2 px-1 font-medium">Consumption</th>
                                <th className="py-2 px-1 font-medium text-right">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {costBreakdown.breakdown.map(item => (
                                <tr key={item.name} className="border-b">
                                    <td className="py-2 px-1">{item.name}</td>
                                    <td className="py-2 px-1">{item.consumption}</td>
                                    <td className="py-2 px-1 text-right">₹{item.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="font-bold">
                            <tr>
                                <td colSpan="2" className="py-2 px-1 text-right">Total Ingredient Cost</td>
                                <td className="py-2 px-1 text-right">₹{costBreakdown.total.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </Section>
    );
};

// Helper component for summary lists
const SummaryList = ({ title, type, items, onRemove, onEdit, ingredients }) => {
    const headers = {
        sales: ['Product', 'Customer', 'Units', 'Total', 'Actions'],
        expenses: ['Category', 'Amount', 'Actions'],
        returns: ['Product', 'Name', 'Units', 'Total', 'Actions'],
    };

    const renderRow = (item) => {
        const commonActions = (
            <div className="flex items-center justify-end space-x-2">
                <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800">Edit</button>
                <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
        );

        switch (type) {
            case 'sales':
                const coverPrice = ingredients.find(i => i.name === 'Packaging Cover')?.price || 0;
                const packagingCost = (item.productType === 'Chapati' && item.packaging === 'With Cover') 
                    ? (item.units || 0) * coverPrice 
                    : 0;
                const total = (item.units || 0) * (item.price || 0) + packagingCost;

                return (
                    <tr key={item.id} className="border-b">
                        <td className="py-2 px-1">{item.productType}</td>
                        <td className="py-2 px-1">{item.name}</td>
                        <td className="py-2 px-1">{item.units}</td>
                        <td className="py-2 px-1">₹{total.toFixed(2)}</td>
                        <td className="py-2 px-1 text-right">{commonActions}</td>
                    </tr>
                );
            case 'expenses':
                return (
                    <tr key={item.id} className="border-b">
                        <td className="py-2 px-1">{item.category}</td>
                        <td className="py-2 px-1">₹{item.amount}</td>
                        <td className="py-2 px-1 text-right">{commonActions}</td>
                    </tr>
                );
            case 'returns':
                 const returnTotal = (item.units || 0) * (item.pricePerUnit || 0);
                 return (
                    <tr key={item.id} className="border-b">
                        <td className="py-2 px-1">{item.productType}</td>
                        <td className="py-2 px-1">{item.name}</td>
                        <td className="py-2 px-1">{item.units}</td>
                        <td className="py-2 px-1">₹{returnTotal.toFixed(2)}</td>
                        <td className="py-2 px-1 text-right">{commonActions}</td>
                    </tr>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h4 className="font-semibold text-gray-600">{title}</h4>
            {items.length === 0 ? <p className="text-sm text-gray-500 mt-2">No entries yet.</p> : (
                <div className="overflow-x-auto mt-2">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                {headers[type].map(h => <th key={h} className={`py-2 px-1 font-medium ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => renderRow(item))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};


const Reports = ({ dailyRecords }) => {
    const [startDate, setStartDate] = useState(getTodayDateString());
    const [endDate, setEndDate] = useState(getTodayDateString());

    const handleDownload = () => {
        const recordsToDownload = Object.entries(dailyRecords)
            .filter(([date]) => date >= startDate && date <= endDate)
            .reduce((acc, [date, record]) => {
                acc[date] = record;
                return acc;
            }, {});
        
        console.log("--- Report Data ---");
        console.log("Date Range:", startDate, "to", endDate);
        console.log(recordsToDownload);
        alert("Report data for the selected range has been logged to the console.");
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Reports</h2>
            <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-3">Download Daily Data</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="w-full sm:w-auto">
                        <label htmlFor="startDate" className="label">From</label>
                        <input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="form-input"/>
                    </div>
                    <div className="w-full sm:w-auto">
                        <label htmlFor="endDate" className="label">To</label>
                        <input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="form-input"/>
                    </div>
                    <div className="w-full sm:w-auto pt-0 sm:pt-6">
                         <button onClick={handleDownload} className="button-primary w-full">Download Report</button>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">Note: The "Download" button currently logs the data to the browser's developer console. Full PDF/Excel export is a future feature.</p>
            </div>
        </div>
    );
};


const Settings = ({ staff, addStaff, updateStaff, ingredients, updateIngredient }) => {
  const [isStaffModalOpen, setStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  
  const [isIngredientModalOpen, setIngredientModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);

  const openStaffModal = (staffMember = null) => { setEditingStaff(staffMember); setStaffModalOpen(true); };
  const openIngredientModal = (ingredient = null) => { setEditingIngredient(ingredient); setIngredientModalOpen(true); };
  const closeModals = () => { setStaffModalOpen(false); setEditingStaff(null); setIngredientModalOpen(false); setEditingIngredient(null); };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold">Staff Management</h3><button onClick={() => openStaffModal()} className="button-primary !w-auto">Add New Staff</button></div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-full divide-y divide-gray-200"><thead className="bg-gray-50"><tr><th className="th">Name</th><th className="th">Role</th><th className="th">Salary</th><th className="th">Status</th><th className="th text-right">Actions</th></tr></thead><tbody className="bg-white divide-y divide-gray-200">{staff.map(s => (<tr key={s.id}><td className="td font-medium">{s.name}</td><td className="td">{s.role}</td><td className="td">₹{s.salary} {s.salaryBasis}</td><td className="td"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{s.isActive ? 'Active' : 'Inactive'}</span></td><td className="td text-right"><button onClick={() => openStaffModal(s)} className="text-indigo-600 hover:text-indigo-900">Edit</button></td></tr>))}</tbody></table></div></div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold">Ingredient Price Management</h3></div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-full divide-y divide-gray-200"><thead className="bg-gray-50"><tr><th className="th">Ingredient</th><th className="th">Price</th><th className="th text-right">Actions</th></tr></thead><tbody className="bg-white divide-y divide-gray-200">{ingredients.map(i => (<tr key={i.id}><td className="td font-medium">{i.name}</td><td className="td">₹{i.price} / {i.perAmount} {i.unit}</td><td className="td text-right"><button onClick={() => openIngredientModal(i)} className="text-indigo-600 hover:text-indigo-900">Edit</button></td></tr>))}</tbody></table></div></div>
      </div>

      {isStaffModalOpen && <StaffFormModal staffMember={editingStaff} onClose={closeModals} onSave={editingStaff ? updateStaff : addStaff} />}
      {isIngredientModalOpen && <IngredientFormModal ingredient={editingIngredient} onClose={closeModals} onSave={updateIngredient} />}
    </div>
  );
};

// --- Modal Components ---
const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-6">{title}</h3>
        {children}
      </div>
    </div>
);

const ModalActions = ({ onCancel, onSave, saveText = "Save" }) => (
    <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="button-secondary">Cancel</button>
        <button type="submit" className="button-success">{saveText}</button>
    </div>
);

const SaleFormModal = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e) => { e.preventDefault(); onSave('sales', formData); };
    return (
        <Modal title="Edit Sale" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <select value={formData.productType} onChange={e => setFormData({...formData, productType: e.target.value})} className="form-select"><option>Chapati</option><option>Poori</option></select>
                    <input type="text" placeholder="Customer Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" required />
                    <input type="number" placeholder="Units" value={formData.units} onChange={e => setFormData({...formData, units: parseFloat(e.target.value) || 0})} className="form-input" required />
                    <input type="number" placeholder="Price/Unit" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="form-input" required />
                    {formData.productType === 'Chapati' && (<select value={formData.packaging} onChange={e => setFormData({...formData, packaging: e.target.value})} className="form-select"><option>With Cover</option><option>Without Cover</option></select>)}
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className={`form-select ${formData.productType === 'Chapati' ? '' : 'col-span-2'}`}><option>Cash</option><option>Credit</option></select>
                </div>
                <ModalActions onCancel={onClose} />
            </form>
        </Modal>
    );
};

const ExpenseFormModal = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e) => { e.preventDefault(); onSave('expenses', formData); };
    return (
        <Modal title="Edit Expense" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="form-select"><option>Ingredients</option><option>Transport</option><option>Packing</option><option>Salaries</option><option>Other</option></select>
                    <input type="number" placeholder="Amount (₹)" value={formData.amount} onChange={e => setFormData({...formData, amount: parseFloat(e.target.value) || 0})} className="form-input" required />
                </div>
                <input type="text" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="form-input col-span-2" />
                <ModalActions onCancel={onClose} />
            </form>
        </Modal>
    );
};

const ReturnFormModal = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState(item);
    const handleSubmit = (e) => { e.preventDefault(); onSave('returns', formData); };
    return (
        <Modal title="Edit Return" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <select value={formData.productType} onChange={e => setFormData({...formData, productType: e.target.value})} className="form-select"><option>Chapati</option><option>Poori</option></select>
                    <input type="text" placeholder="Customer Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" required />
                    <input type="number" placeholder="Units Returned" value={formData.units} onChange={e => setFormData({...formData, units: parseFloat(e.target.value) || 0})} className="form-input" required />
                    <input type="number" placeholder="Price per Unit (₹)" value={formData.pricePerUnit} onChange={e => setFormData({...formData, pricePerUnit: parseFloat(e.target.value) || 0})} className="form-input" required />
                </div>
                <ModalActions onCancel={onClose} />
            </form>
        </Modal>
    );
};


const StaffFormModal = ({ staffMember, onClose, onSave }) => {
  const [formData, setFormData] = useState(staffMember || { name: '', role: 'Production Staff', salary: 0, salaryBasis: 'Per Day', isActive: true });
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); onClose(); };

  return (
    <Modal title={staffMember ? 'Edit Staff' : 'Add New Staff'} onClose={onClose}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="label">Full Name</label><input type="text" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" required /></div>
          <div><label className="label">Role</label><input type="text" name="role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="form-input" required /></div>
          <div className="flex space-x-4"><div className="flex-1"><label className="label">Salary (₹)</label><input type="number" name="salary" value={formData.salary} onChange={e => setFormData({...formData, salary: parseFloat(e.target.value) || 0})} className="form-input" required /></div><div className="flex-1"><label className="label">Salary Basis</label><select name="salaryBasis" value={formData.salaryBasis} onChange={e => setFormData({...formData, salaryBasis: e.target.value})} className="form-select"><option>Per Day</option><option>Per Month</option></select></div></div>
          <div className="flex items-center"><input type="checkbox" name="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" /><label className="ml-2 block text-sm text-gray-900">Is Active</label></div>
          <ModalActions onCancel={onClose} />
        </form>
    </Modal>
  );
};

const IngredientFormModal = ({ ingredient, onClose, onSave }) => {
  const [formData, setFormData] = useState(ingredient);
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); onClose(); };

  return (
    <Modal title="Edit Ingredient Price" onClose={onClose}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="label">Ingredient Name</label><input type="text" value={formData.name} className="form-input bg-gray-100" readOnly /></div>
          <div className="flex space-x-4"><div className="flex-1"><label className="label">Price (₹)</label><input type="number" name="price" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="form-input" required /></div><div className="flex-1"><label className="label">Per Amount</label><input type="number" name="perAmount" value={formData.perAmount} onChange={e => setFormData({...formData, perAmount: parseFloat(e.target.value) || 0})} className="form-input" required /></div><div className="flex-1"><label className="label">Unit</label><input type="text" name="unit" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="form-input" required /></div></div>
          <ModalActions onCancel={onClose} />
        </form>
    </Modal>
  );
};
