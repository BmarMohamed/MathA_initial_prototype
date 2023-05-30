const DomainsTools = {
    subtractDomainBy(domain : [number, number], subtract_domain : [number, number]) : Array<[number, number]> | undefined {
        if(!subtract_domain) return [domain];
        else if(domain[0] > subtract_domain[0] && domain[1] < subtract_domain[1]) [];
        else if(domain[0] > subtract_domain[1] || domain[1] < subtract_domain[0]) return [domain];
        else if(domain[0] < subtract_domain[0] && domain[1] < subtract_domain[1]) return [[domain[0] , subtract_domain[0]]];
        else if(domain[0] > subtract_domain[0] && domain[1] > subtract_domain[1]) return [[subtract_domain[1], domain[1]]];
        else if(domain[0] < subtract_domain[0] && domain[1] > subtract_domain[1]) return [[domain[0], subtract_domain[0]], [subtract_domain[1], domain[1]]]
    }
}

export default DomainsTools;