import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage-service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    spyOn(localStorage, 'getItem').and.callFake(() => null);
    spyOn(localStorage, 'setItem').and.stub();
    spyOn(localStorage, 'removeItem').and.stub()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when localStorage returns null', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue(null);

    const result = service.getValue('id');

    expect(localStorage.getItem).toHaveBeenCalledWith('id');
    expect(result).toBeNull();
  });

  it('should parse boolean true/false', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('true');
    expect(service.getValue('id')).toBeTrue();

    (localStorage.getItem as jasmine.Spy).and.returnValue('false');
    expect(service.getValue('id')).toBeFalse();
  });

  it('should parse number', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('42');
    expect(service.getValue('id')).toBe(42);
  });

  it('should parse bigint', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('123n');
    expect(service.getValue('id')).toEqual(123n);
  });

  it('should parse ISO date string', () => {
    const iso = '2024-05-01T12:00:00.000Z';
    (localStorage.getItem as jasmine.Spy).and.returnValue(iso);

    const result = service.getValue('id') as Date;

    expect(result instanceof Date).toBeTrue();
    expect(result.toISOString()).toBe(iso);
  });

  it('should parse JSON object', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('{"a":1}');
    expect(service.getValue('id')).toEqual({ a: 1 });
  });

  it('should parse JSON array', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('[1,2,3]');
    expect(service.getValue('id')).toEqual([1, 2, 3]);
  });

  it('should return string when no other rule matches', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('hello');
    expect(service.getValue('id')).toBe('hello');
  });

  it('should return undefined when stored as "undefined"', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('undefined');
    expect(service.getValue('id')).toBeUndefined();
  });

  it('should store null as "null"', () => {
    service.storeValue('id', null);
    expect(localStorage.setItem).toHaveBeenCalledWith('id', 'null');
  });

  it('should store undefined as "undefined"', () => {
    service.storeValue('id', undefined);
    expect(localStorage.setItem).toHaveBeenCalledWith('id', 'undefined');
  });

  it('should store Date as ISO string', () => {
    const date = new Date('2024-05-01T12:00:00.000Z');
    service.storeValue('id', date);
    expect(localStorage.setItem).toHaveBeenCalledWith('id', date.toISOString());
  });

  it('should store object as JSON', () => {
    const obj = { a: 1 };
    service.storeValue('id', obj);
    expect(localStorage.setItem).toHaveBeenCalledWith('id', JSON.stringify(obj));
  });

  it('should store number as string', () => {
    service.storeValue('id', 123);
    expect(localStorage.setItem).toHaveBeenCalledWith('id', '123');
  });

  it('should store bigint as string', () => {
    service.storeValue('id', 123n);
    expect(localStorage.setItem).toHaveBeenCalledWith('id', '123n');
  });

  it('should store boolean as string', () => {
    service.storeValue('id', true);
    expect(localStorage.setItem).toHaveBeenCalledWith('id', 'true');
  });

  it('should store string as string', () => {
    service.storeValue('id', 'hello');
    expect(localStorage.setItem).toHaveBeenCalledWith('id', 'hello');
  });

  it('should remove value from localStorage', () => {
    service.removeValue('id');
    expect(localStorage.removeItem).toHaveBeenCalledWith('id');
  });
});
