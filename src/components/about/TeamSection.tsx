import { Linkedin, Twitter, Github, Mail, Users } from 'lucide-react';
import { usePublicTeamMembers } from '@/hooks/useTeamMembers';

const TeamSection = () => {
  const { members, isLoading } = usePublicTeamMembers();

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Users className="w-4 h-4" /> The Humans Behind NafArro
          </span>
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-subtitle mx-auto">
            A small, senior team that ships fast and treats your business like our own.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-muted/50 rounded-2xl h-80" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Team members will appear here soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((m, i) => (
              <div
                key={m.id}
                className="group animate-on-scroll relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-muted/40 border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                  {m.image_url ? (
                    <img
                      src={m.image_url}
                      alt={`${m.name}, ${m.role}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary/40">
                        {m.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary">{m.name}</h3>
                  <p className="text-sm text-accent font-medium mb-2">{m.role}</p>
                  {m.bio && <p className="text-sm text-gray-600 line-clamp-3 mb-3">{m.bio}</p>}

                  <div className="flex items-center gap-2">
                    {m.linkedin_url && (
                      <a href={m.linkedin_url} target="_blank" rel="noreferrer"
                        aria-label={`${m.name} on LinkedIn`}
                        className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {m.twitter_url && (
                      <a href={m.twitter_url} target="_blank" rel="noreferrer"
                        aria-label={`${m.name} on Twitter`}
                        className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {m.github_url && (
                      <a href={m.github_url} target="_blank" rel="noreferrer"
                        aria-label={`${m.name} on GitHub`}
                        className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {m.email && (
                      <a href={`mailto:${m.email}`}
                        aria-label={`Email ${m.name}`}
                        className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
